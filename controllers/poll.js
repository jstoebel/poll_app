let models = require('require.all')('../models');

exports.index = function(req, res) {
  // show all polls

  models.Poll.find({}, function(err, allPolls) {
    if (err) {
      throw err;
    }

    res.json({polls: allPolls});
  });
};

exports.create = function(req, res) {
  // create a new poll

  let params = {
    name: req.body.name,
    user: req.user._id,
  };

  let poll = new models.Poll(params);

  // split the contents of the text box by new line. each is a new option
  req
    .body
    .options
    .split('\n')
    .forEach(function(opt) {
      poll.options.push({name: opt, votes: 0});
    });

  poll.save(function(err, poll) {
    if (err) {
        res.status(400).json({msg: 'Failed to create poll'});
    } else {
      // next make the options
      res.json({id: poll._id, msg: `Successfully created poll ${params.name}`, success: true});
    }
  });
};

exports.show = function(req, res) {
  // returns info on a single poll
  models.Poll.findOne({_id: req.params.pollId}, function(err, poll) {
    if (err) {
      res.status(404);
    }
    res.json(poll);
  });
};

exports.vote = function(req, res) {
  // process vote on a poll

  // find a poll and increment the chosen option by 1
  models.Poll.findOneAndUpdate(
    {'_id': req.body.pollId, 'options._id': req.body.optionId},
    {
      $inc: {
        'options.$.votes': 1,
      },
    },
    {new: true},
    function(err, poll) {
      if (!poll) {
        res.status(400).json({msg: 'Failed to update poll'});
      } else {
        res.status(201).json({msg: 'Vote successful'});
      }
    }
  );
};

exports.indexAdmin = function(req, res) {
  // return all of user's polls

  models.Poll.find({user: req.user._id}, function(err, polls) {
    if (err) {
      throw err;
    }

    res.json({polls: polls});
  });
};

exports.destroy = function(req, res) {
  // destroy a poll

  let params = {
    _id: req.body._id,
    user: req.user,
  };

  models.Poll.remove(params, function(err, obj) {
    console.log(err);
    console.log(obj.result.n);
    if (obj.result.n === 0) {
      res.status(404).json({msg: 'Poll not removed. It either does not exist or does not belong to you.'});
    } else {
      res.status(200).json({msg: 'Successfully removed poll', success: true});
    }
  });
};

exports.addOption = function(req, res) {
  // add an option to a poll and return the poll

  models.Poll.findOne({_id: req.body.pollId}, function(err, poll) {
    if (err) {
      throw err;
    }

    poll.options.push({name: req.body.optionName, votes: 0});

    poll.save(function(err, poll) {
      if (err) {
          res.status(400).json({msg: 'Failed to add option to poll'});
      } else {
        // next make the options
        res.json({poll: poll, msg: 'Successfully updated poll', success: true});
      }
    });
  });
};

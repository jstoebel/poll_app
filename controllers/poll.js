var models = require('require.all')('../models')

exports.index = function(req, res) {

  models.Poll.find(function(err, polls){
    if (err) {
      throw err;
    }

    res.end(JSON.stringify( {polls: polls} ) );

  })

};

exports.new = function(req, res) {
  res.end("hello from new")
}

exports.create = function(req, res) {

  var params = {
    name: req.body.name,
    user: req.user._id
  };

  var poll = new models.Poll(params);

  req
    .body
    .options
    .split("\n")
    .forEach(function(opt){
      poll.options.push({name: opt, votes: 0})
    });

  poll.save(function(err, poll){
    if (err){
        console.log(err);
        res.status(400).json({msg: "Failed to create poll"})
    } else {
      // next make the options
      res.json({id: poll._id, msg: `Successfully created poll ${params.name}`, success: true })

    }
  })
};

exports.show = function(req, res) {
  models.Poll.findOne({_id: req.params.pollId}, function(err, poll){
    res.json(poll)
  })
};

exports.vote = function(req, res) {
  // expected params

  models.Poll.findOneAndUpdate(
    { "_id": req.body.pollId, "options._id": req.body.optionId },
    {
      $inc: {
        "options.$.votes": 1
      }
    },
    function(err,doc) {
        if (err){
          console.log(err);
          res.status(400).json({msg: "Failed to update poll"})
        } else {
          res.status(201).json({msg: "Vote successful"})
        }
    }
  );

}

exports.indexAdmin = function(req, res) {

  models.Poll.find({user: req.user._id}, function(err, polls){

    if (err) {
      throw err;
    }

    res.json({polls: polls})

  })

}

exports.edit = function(req, res) {
  res.end("hello from edit")
};

exports.update = function(req, res) {
  res.end("hello from update")
};

exports.destroy = function(req, res) {
  // destroy a poll

  // find the poll

  models.Poll.find(req.body, function(err, poll){
    if (err){
      req.status(204).json({msg: "Couldn't find poll to delete"})
    }

    // authorize permission to remove
    if (poll._id = req.user._id){

      models.Poll.remove(req.body, function(err) {
        if (err) {
          res.status(204).json({msg: "Couldn't delete record"})
        } else {
          res.status(200).json({msg: "Successfully removed poll", success: true });
        }

      })

    } else {
      // not authorized to delete
      res.status(403).json({msg: "Access denied-that poll doesn't belong to you."});
    }


  }) // find

}

exports.addOption = function(req, res) {
  // add an option to a poll and return the poll

  models.Poll.findOne({_id: req.body.pollId}, function(err, poll){


    if (err) {
      throw err;
    }

    poll.options.push({name: req.body.optionName, votes: 0})

    poll.save(function(err, poll){
      if (err){
          console.log(err);
          res.status(400).json({msg: "Failed to add option to poll"})
      } else {
        // next make the options
        res.json({poll: poll, msg: "Successfully updated poll", success: true })

      }
    })
  })

}

exports.destroyAll = function(req, res) {
  // destroy ALL POLLS

  models.Poll.remove({}, function(err){
    if (err) {
      res.status(204).json({msg: "Polls couldn't delete records"})
    } else {

      models.Poll.count({}, function(err, c) {
        res.status(200).json({msg: "Polls remaining: " + c})
      });
    }
  })

};

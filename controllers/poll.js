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
  console.log(req.body);

  var params = {
    name: req.body.name,
    user: req.user._id
  }

  var poll = new models.Poll(params);
  poll.save(function(err, poll){
    if (err){
        res.status(400).json({msg: "Failed to create poll"})
    }

    res.json({msg: `Successfully created poll ${params.name}` })
  })
};

exports.show = function(req, res) {
  res.end("hello from show")
};

exports.edit = function(req, res) {
  res.end("hello from edit")
};

exports.update = function(req, res) {
  res.end("hello from update")
};

exports.destroy = function(req, res) {
  res.end("hello from destory")
};

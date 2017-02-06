var models = require('require.all')('../models')

exports.index = function(req, res) {
  models.User.findById(req.user._id).exec()
    .then(function(user){
      user.polls()
    })
    .then(function(polls){
      res.render('polls/index', {
        polls: polls
      });
    })
    .catch(function(err){
      console.log(err)
    })

};

exports.new = function(req, res) {
  res.end("hello from new")
};

exports.create = function(req, res) {
  res.end("hello from create")
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

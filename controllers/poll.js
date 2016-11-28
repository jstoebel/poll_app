var models = require('require.all')('../models')

exports.index = function(req, res) {
  res.end("hello from index")
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

exports.destory = function(req, res) {
  res.end("hello from destory")
};

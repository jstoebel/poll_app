var mongoose = require('mongoose');
var voteSchema = new mongoose.Schema({
  // need an owner
  // belongs to an option

}, {timestamps: true});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;

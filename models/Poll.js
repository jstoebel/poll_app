var mongoose = require('mongoose');
var pollSchema = new mongoose.Schema({
  name: String,

  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'polls'},

  options: [{type: mongoose.Schema.ObjectId, ref: 'Option'}]


}, {timestamps: true});

var Poll = mongoose.model('Poll', pollSchema);

modules.exports = Poll;

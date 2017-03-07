var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  models = require('require.all')('.')

var optionSchema = new mongoose.Schema({
  name: String,
  votes: Number
}, {timestamps: true});

var pollSchema = new mongoose.Schema({
  name: String,
  user:  { type: ObjectId, ref: 'User' },
  options: [optionSchema]

}, {timestamps: true});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll

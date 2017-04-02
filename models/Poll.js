var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  models = require('require.all')('.');

var optionSchema = new mongoose.Schema({
  name: {required: true, type: String},
  votes: {required: true, type: Number}
}, {timestamps: true});

var pollSchema = new mongoose.Schema({
  name: {required: true, type: String},
  user:  { type: ObjectId, ref: 'User', required: true },
  options: [optionSchema]

}, {timestamps: true});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll

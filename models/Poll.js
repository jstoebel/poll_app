let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

let optionSchema = new mongoose.Schema({
  name: {required: true, type: String},
  votes: {required: true, type: Number},
}, {timestamps: true});

let pollSchema = new mongoose.Schema({
  name: {required: true, type: String},
  user: {type: ObjectId, ref: 'User', required: true},
  options: [optionSchema],

}, {timestamps: true});

let Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;

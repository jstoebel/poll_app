var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var pollSchema = new mongoose.Schema({
  name: String,
  user:  { type: ObjectId, ref: 'User' }

}, {timestamps: true});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;

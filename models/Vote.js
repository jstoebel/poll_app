var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  
var voteSchema = new mongoose.Schema({
  // belongs to an option
  user: { type: ObjectId, ref: 'User' },
  option: { type: ObjectId, ref: 'Option' }


}, {timestamps: true});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;

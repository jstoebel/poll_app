var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var optionSchema = new mongoose.Schema({
  name: String,
  user: { type: ObjectId, ref: 'User' },
  poll: { type: ObjectId, ref: 'Poll' }
}, {timestamps: true});

var Option = mongoose.model('Option', optionSchema);

module.exports = Option;

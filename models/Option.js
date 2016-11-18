var mongoose = require('mongoose');
var optionSchema = new mongoose.Schema({
  name: String,
  user: {type:mongoose.Schema.ObjectId, ref: "Poll"}

}, {timestamps: true});

var Option = mongoose.model('Option', optionSchema);

module.exports = Option;

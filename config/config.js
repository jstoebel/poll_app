// borrowed from here: http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application/7350875#7350875
//Set the current environment to true in the env object
var dotenv = require('dotenv');
dotenv.load();
exports.currentEnv = process.env.NODE_ENV || 'development'

exports.appName = "voting";

// either Heroku's URL or create my own
exports.db = {URL: process.env.MONGODB_URI ||
  "mongodb://localhost:27017/"+exports.appName.toLowerCase()+"_"+exports.currentEnv}

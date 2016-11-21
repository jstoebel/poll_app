//define a factory like this

var factory = require('factory-girl').factory;
var User    = require('./models/User');

factory.define('user', User, {
  email: 'Bob',
  'password': '123'
});

//export it like this.
module.exports = factory

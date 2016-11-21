var factory = require('factory-girl').factory;
var models = require('require.all')('../models')

factory.define('user', models.User, {
  email: factory.sequence(function(n) {
    return 'user' + n + '@demo.com';
  })
  password: '123',
  passwordResetToken: '123',
  passwordResetExpires: new Date(),

});

module.exports = factory

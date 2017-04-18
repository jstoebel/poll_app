var models = require('require.all')('../models')
var fg = require('factory-girl');

var adapter = new fg.MongooseAdapter();
var factory = fg.factory
factory.setAdapter(adapter);

factory.define('user', models.User, {
  email: factory.sequence('User.email', (n) => `email_${n}@demo.com`),
  password: '123',

});

factory.define('poll', models.Poll, {
  name: "some poll",
  user: factory.assoc('user', '_id'),
  options: [
    {
      name: "first option",
      votes: 2
    }
  ]
})

module.exports = factory;

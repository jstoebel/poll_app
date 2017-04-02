var models = require('require.all')('../models')

var factory = require('factory-girl');
const adapter = new factory.MongooseAdapter();
factory = factory.factory;
factory.setAdapter(adapter);

factory.define('user', models.User, {
  email: factory.sequence(function(n) {
    return 'user' + n + '@demo.com';
  }),
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

module.exports = factory

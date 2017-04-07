var models = require('require.all')('../models')
var fg = require('factory-girl');

var adapter = new fg.MongooseAdapter();
factory = fg.factory;
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

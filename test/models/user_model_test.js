let chai = require('chai');
let should = chai.should();
let models = require('require.all')('../models');
let factory = require('../factories');

require('../test_config');

describe('User Model', () => {
  it('requires a unique email', function(done) {
    factory.createMany('user', 2, {email: 'same@email.com'}).then(function(users) {
      done(new Error('fail'));
    }).catch(function(err) {
      err.code.should.equal(11000);
      done();
    });
  });
});

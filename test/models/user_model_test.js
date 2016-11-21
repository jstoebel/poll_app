var chai = require('chai');
var should = chai.should();
var models = require('require.all')('../../models')
require('../test_config')

describe('User Model', function() {

  // it ("should start with an empty collection", function(done){
  //   models.User.count({}, function(err, count){
  //     console.log(count)
  //     done();
  //   })
  // })

  it('should not create a user with the unique email', function(done) {
    var user = new models.User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });
});

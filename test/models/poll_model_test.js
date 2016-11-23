var chai = require('chai');
var should = chai.should();
var models = require('require.all')('../models')
var factory = require('../factories')

require('../test_config')

describe('Poll Model', function() {

  it('belongs to a user', function(done) {
    factory.create('poll').then(function(poll){
      //try to find a user with poll.user
      models.User.findOne({_id: poll.user}, function(err, user){
        if (err){
          // couldn't find a user belonging to that poll!
          done(new Error(err))
        }
        //the record was found. Pass!
        done();
      })

    }).catch(function(err){
      // couldn't create a poll
      done(new Error(err))
    })

  }); // it

});

var chai = require('chai');
var should = chai.should();
var models = require('require.all')('../models')
var factory = require('../factories')

require('../test_config')

describe('Option Model', function() {

  it('belongs to a user', function(done) {
    factory.create('option').then(function(option){
      //try to find a user that owns this option
      models.User.findOne({_id: option.user}, function(err, user){
        if (err){
          // couldn't find!
          done(new Error(err))
        }
        //the record was found. Pass!
        done();
      })

    }).catch(function(err){
      // couldn't create!
      done(new Error(err))
    })

  }); // it

  it('belongs to a poll', function(done) {
    factory.create('option').then(function(option){
      //try to find a poll that owns this option
      models.Poll.findOne({_id: option.poll}, function(err, user){
        if (err){
          // couldn't find!
          done(new Error(err))
        }
        //the record was found. Pass!
        done();
      })

    }).catch(function(err){
      // couldn't create!
      done(new Error(err))
    })

  }); // it

});

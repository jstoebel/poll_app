var chai = require('chai');
var should = chai.should();
var models = require('require.all')('../models')
var factory = require('../factories')

require('../test_config')

describe('Vote Model', function() {

  it('belongs to a user', function(done) {
    factory.create('vote').then(function(vote){
      //try to find a user that owns this vote
      models.User.findOne({_id: vote.user}, function(err, user){
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

  it('belongs to an option', function(done) {
    factory.create('vote').then(function(vote){
      //try to find a poll that owns this option
      models.Poll.findOne({_id: vote.option}, function(err, user){
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

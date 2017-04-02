var chai = require('chai');
var should = chai.should();
var models = require('require.all')('../models')
var factory = require('../factories')
var expect = require('chai').expect

require('../test_config')

describe('Poll Model', function() {

  ['name', 'user'].forEach(function(attr){
    it ('validates ' + attr, function(done){
      var poll = new models.Poll;

      poll.validate(function(err){
        expect(err.errors[attr]).to.exist;
        done();
      })
    })
  })

  it ('validates options', function(done){

    user = factory.create('user').then(function(user){

      var poll = new models.Poll;
      poll.name = "poll name"
      poll.user = user;

      console.log("here");
      poll.validate(function(err){
        console.log(err);;
        done();
      })

    }).catch(function(err){
      console.log(err);
      done(err);
    })


  })

  // it ('validates required fields', function(done) {
  //   var poll = new models.Poll;
  //
  //   ['name', 'user', "blarg"].forEach(function(attr){
  //     poll.validate(function(err){
  //       console.log("testing " + attr);
  //       expect(err.errors[attr]).to.not.exist
  //       console.log("tested " + attr);
  //     })
  //   })
  //
  // })

});

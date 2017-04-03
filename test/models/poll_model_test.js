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
  }) // loop

  // ['name', 'votes'].forEach(function(attr){

    it('validates options: ' + 'spam', function(done){
      var user = new models.User({
        email: "fake@fake.com",

      })
      user.save()

      var poll = new models.Poll({
        name: "poll name",
        user: user._id,
        options: [{}]
      })

      poll.validate(function(err){
        expect(err.errors).to.exist;
        done();
      })
    })
  // }) // options loop

});

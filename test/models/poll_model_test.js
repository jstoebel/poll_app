// var chai = require('chai');
// var should = chai.should();
// var models = require('require.all')('../models');
// var factory = require('../factories');
// var expect = require('chai').expect;

import chai from 'chai';
import {should, expect} from 'chai';
import requireAll from 'require.all';
import factory from '../factories';
require('../test_config');

const models = requireAll('../models');

describe('Poll Model', () => {
  ['name', 'user'].forEach(attr => {
    it ('validates ' + attr, done => {
      var poll = new models.Poll;

      poll.validate(err => {
        expect(err.errors[attr]).to.exist;
        done();
      })
    })
  }) // loop


    it('validates options: ' + 'bogus', done => {
      var user = new models.User({
        email: "fake@fake.com",

      })
      user.save()

      var poll = new models.Poll({
        name: "poll name",
        user: user._id,
        options: [{}]
      })

      poll.validate(err => {
        expect(err.errors).to.exist;
        done();
      })
    })
  // }) // options loop

});

//  Modified from https://github.com/elliotf/mocha-mongoose

var config = require('../config/config');
var mongoose = require('mongoose');
var _ = require('underscore');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

function clearDB() {
  console.log("starting clearDB");

  _.each(mongoose.connection.models, (value, key) => {
    console.log("removed a model");
    value.remove({}, (err, removed) => {
    });
  })

}

beforeEach(done => {
  clearDB();
  done();
});


afterEach(done => {
  console.log("starting afterEach");
  clearDB();
  mongoose.disconnect();
  return done();
});

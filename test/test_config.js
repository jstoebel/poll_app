//  Modified from https://github.com/elliotf/mocha-mongoose


var config = require('../config/config');
var mongoose = require('mongoose');
var _ = require('underscore')

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

beforeEach(function (done) {
  function clearDB() {
    _.each(mongoose.connection.models, function(value, key){
      value.remove({}, function(err, removed) {
      });
    })

    // for (var i in mongoose.connection.collections) {
    //   mongoose.connection.collections.forEach(function(i){
    //     console.log(i)
    //   })
    //   // mongoose.connection.collections[i].remove(function() {});
    // }
    return done();
  }


  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db.URL, function (err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});


afterEach(function (done) {
  mongoose.disconnect();
  return done();
});

//  Modified from https://github.com/elliotf/mocha-mongoose
var config = require('../config/config');
var mongoose = require('mongoose');
var _ = require('underscore');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

beforeEach(function () {

  _.each(mongoose.connection.models, function(model, name){
    model.remove({}, function(err, removed){
    })
  })
  //
  // function clearDB() {
  //   console.log("starting clearDB");
  //   _.each(mongoose.connection.models, function(model, name){
  //     console.log(`removing ${name}...`);
  //     model.remove({}, function(err, removed) {
  //       if (err){
  //         done(err);
  //       }
  //       model.count({}, function(err, c){
  //         console.log(`${name} qty: ${c}`);
  //       })
  //     });
  //   })
  // }
  //
  // if (mongoose.connection.readyState === 0) {
  //   mongoose.connect(config.db.URL, function (err) {
  //     if (err) {
  //       throw err;
  //     }
  //     clearDB();
  //     console.log("done with clearDB");
  //   });
  // } else {
  //   clearDB();
  //   console.log("done with clearDB");
  // }
});


// afterEach(function (done) {
//   mongoose.disconnect();
//   return done();
// });

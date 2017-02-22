/**
 * GET /
 * Home page.
 */

var models = require('require.all')('../models')
var factory = require('../test/factories')

exports.index = function(req, res) {

  models.Poll.find(function(err, polls){
    if (err) {
      throw err;
    }

    // stub out for now
    var polls = [
      {name: "test poll", user: "test user"}
    ]

    res.render('home', {
      title: 'Home',
      polls: polls
    });

  })
};

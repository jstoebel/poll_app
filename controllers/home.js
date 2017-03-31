/**
 * GET /
 * Home page.
 */

var models = require('require.all')('../models')
var factory = require('../test/factories')

exports.index = function(req, res) {

  res.render('home', {
    title: 'Home'
  });

};

exports.welcome = function(req, res) {

  res.render('welcome')

};

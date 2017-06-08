/**
 * GET /
 * Home page.
 */

let models = require('require.all')('../models');
let factory = require('../test/factories');

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home',
  });
};

exports.welcome = function(req, res) {
  res.render('welcome');
};

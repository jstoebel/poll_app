var request = require('supertest');
var app = require('../../app.js');
var models = require('require.all')('../models');
var factory = require('../factories');
var assert = require('chai').assert;
var login = require('../login');
var agent = request.agent();
passportStub = require('passport-stub');

describe('GET index', function() {
  it ('should return 200 OK', function(done){

    factory.create('poll')
      .then(function(poll){
        request(app)
          .get('/api/polls')
          .expect(200)
          .then(function(resp){
            assert(resp.body, [poll])
            done();
          })

      })

  })
})

describe('POST create', function() {
  before(function(done){
    passportStub.install(app);
    done();
  })

  after(function(done){
    passportStub.uninstall(app);
    done();
  })

  it('should return 200 OK with good params', function(done){

    factory.create('user')
      .then(function(user){
          passportStub.login(user);

          factory.build('poll')
          .then(function(poll){
            request(app)
              .post('/api/polls')
              .send({ name: poll.name, user: poll.user })
              .expect(200)
              .then(function(resp){
                assert(resp.body, poll)
                done();
              })
            })
          })
      })

  }) // it

  // it('should return 400 on bad params', function(done){
  //   request(app)
  //     .post('/api/polls')
  //     .expect(400, done)
  // })
})

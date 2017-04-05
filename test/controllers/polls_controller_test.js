var request = require('supertest');
var app = require('../../app.js');
var models = require('require.all')('../models');
var factory = require('../factories');
var assert = require('chai').assert;
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
  beforeEach(function(done){
    passportStub.install(app);
    done();
  })

  afterEach(function(done){
    passportStub.logout();
    passportStub.uninstall()
    done();
  })

  it('returns 200 OK with good params', function(done){

    factory.create('user')
      .then(function(user){
          passportStub.login(user);

          factory.build('poll')
          .then(function(poll){
            request(app)
              .post('/api/polls')
              .send(
                { name: poll.name,
                  user: poll.user,
                  options: poll.options.map(function(option){
                    return option.name;
                  }).join("\n")
                })
              .expect(200)
              .then(function(resp){
                assert(resp.body, poll)
                done();
              })
            })
          })

  }) // it

  it('returns 302 when not logged in', function(done){

    factory.build('poll')
    .then(function(poll){
      request(app)
        .post('/api/polls')
        .send(
          { name: poll.name,
            user: poll.user,
            options: poll.options.map(function(option){
              return option.name;
            }).join("\n")
          })
        .expect(302, done)
      })

  }) // it

  it('returns 400 on validation error', function(done){
    factory.create('user')
      .then(function(user){
          passportStub.login(user);

          factory.build('poll')
          .then(function(poll){
            request(app)
              .post('/api/polls')
              .send(
                { name: "",
                  user: poll.user,
                  options: poll.options.map(function(option){
                    return option.name;
                  }).join("\n")
                })
              .expect(400, done)
            })
          })
  })

  it('returns 500 on no options', function(done){
    factory.create('user')
      .then(function(user){
          passportStub.login(user);

          factory.build('poll')
          .then(function(poll){
            request(app)
              .post('/api/polls')
              .send(
                { name: poll.name,
                  user: poll.user,
                  options: null
                })
              .expect(500, done)
          })
      })
  })

})

describe('show', function(){

  it('returns 200 ok', function(done){
    factory.create('poll')
      .then(function(poll){
        request(app)
          .get(`/api/polls/${poll._id}`)
          .expect(200)
          .then(function(resp){
            assert(resp.body, poll)
            done();
          })
      })
  })

  it('returns 404 with bad id', function(done){
    factory.create('poll')
      .then(function(poll){
        request(app)
          .get("/api/polls/bad_id")
          .expect(404, done)
      })
  })
})

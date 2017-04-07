var request = require('supertest');
var app = require('../../app.js');
var models = require('require.all')('../models');
var factory = require('../factories');
var assert = require('chai').assert;
var expect = require('chai').expect
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

describe('vote', function() {

  it('returns 201', function(done){

    factory.create('poll')
      .then(function(poll){
        console.log(poll);
        request(app)
          .post('/api/polls/vote')
          .send(
            { pollId: poll._id,
              optionId: poll.options[0]._id
            }
          )
          .expect(201)
          .then(function(resp){
            expect(resp.body.msg).to.equal("Vote successful")
            // assert(poll.options[0].votes == 3)
            done();
          })
      })

  })

  // it('returns 400 with bad params', function(done){
  //   done();
  // })

})

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
            expect(resp.body.polls.length).to.equal(1)
            assert(resp.body.polls[0]._id == poll._id)
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
                assert(resp.body.msg ==  `Successfully created poll ${poll.name}`)
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
            assert(resp.body._id == poll._id)
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
            done();
          })
      })

  })

  it('returns 400 with bad params', function(done){
    factory.create('poll')
      .then(function(poll){
        request(app)
          .post('/api/polls/vote')
          .send({})
          .expect(400)
          .then(function(resp){
            expect(resp.body.msg).to.equal("Failed to update poll")
            done();
          })
      })
  })

})

describe('indexAdmin', function(){
  beforeEach(function(done){
    passportStub.install(app);
    done();
  })

  afterEach(function(done){
    passportStub.logout();
    passportStub.uninstall()
    done();
  })
  it ('should return 200 OK', function(done){

    factory.create('poll')
      .then(function(poll){
        models.User.find({_id: poll.user}, function(err, user){
          passportStub.login(user)
          request(app)
            .get('/api/polls/admin')
            .expect(200, done)

        })

      })

  })

})

describe('destroy', function(){

  beforeEach(function(done){
    passportStub.install(app);
    done();
  })

  afterEach(function(done){
    passportStub.logout();
    passportStub.uninstall()
    done();
  })

  it('destroys a poll', function(done){

    factory.create('poll')
      .then(function(poll){
        models.User.find({_id: poll.user}, function(err, user){

          passportStub.login(user)
          request(app)
            .delete('/api/poll/destroy')
            .send({
              _id: poll._id
            })
            .expect(200)
            .then(function(resp){
              assert(resp.body.msg == "Successfully removed poll")
              done();
            })

        })

      })

  })

  it("doesn't destroy -- can't find", function(done){
    factory.create('poll')
      .then(function(poll){
        models.User.find({_id: poll.user}, function(err, user){
          passportStub.login(user)
          request(app)
            .delete('/api/poll/destroy')
            .send({
              _id: null
            })
            .expect(404)
            .then(function(resp){
              assert(resp.body.msg == "Poll not removed. It either does not exist or does not belong to you.")
              done();
            })

        })

      })
  })

  it("doesn't destroy -- access denied", function(done){
    // poll belongs to another user

    factory.create('user')
      .then(function(user){
        factory.create('poll')
          .then(function(poll){

            // login as the first user
            passportStub.login(user)
            request(app)
              .delete("/api/poll/destroy")
              .send({_id: poll._id})
              .expect(404)
              .then(function(resp){
                assert(resp.body.msg == "Poll not removed. It either does not exist or does not belong to you.")
                done();
              })

          })

      })

  })

  it("doesn't destroy -- not logged in", function(done){
    factory.create('poll')
      .then(function(poll){
        models.User.find({_id: poll.user}, function(err, user){

          request(app)
            .delete('/api/poll/destroy')
            .send({
              _id: poll._id
            })
            .expect(302, done)

        })

      })
  })

})

describe('addOption', function(){

  beforeEach(function(done){
    passportStub.install(app);
    done();
  })

  afterEach(function(done){
    passportStub.logout();
    passportStub.uninstall()
    done();
  })

  it('adds an option', function(done){
    factory.create('poll')
      .then(function(poll){
        models.User.find({_id: poll.user}, function(err, user){

          passportStub.login(user)
          request(app)
            .post('/api/polls/option')
            .send({
              pollId: poll._id,
              optionName: "some option"
            })
            .expect(200)
            .then(function(resp){
              assert(resp.body.msg == "Successfully updated poll")
              console.log("almost done!");
              done();
            })
        })

      })
  })

})

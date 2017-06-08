let request = require('supertest');
let app = require('../../app.js');
let models = require('require.all')('../models');
let factory = require('../factories');

let assert = require('chai').assert;
let expect = require('chai').expect;
let agent = request.agent();
let passportStub = require('passport-stub');

describe('GET index', () => {
  it('should return 200 OK', (done) => {
    factory.create('poll')
      .then((poll) => {
        request(app)
          .get('/api/polls')
          .expect(200)
          .then((resp) => {
            expect(resp.body.polls.length).to.equal(1);
            assert(resp.body.polls[0]._id == poll._id);
            done();
          });
      });
  });
});

describe('POST create', () => {
  beforeEach((done) => {
    passportStub.install(app);
    done();
  });

  afterEach((done) => {
    passportStub.logout();
    passportStub.uninstall();
    done();
  });

  it('returns 200 OK with good params', (done) => {
    factory.create('user')
      .then((user) => {
          passportStub.login(user);

          factory.build('poll')
          .then((poll) => {
            request(app)
              .post('/api/polls')
              .send(
                {name: poll.name,
                  user: poll.user,
                  options: poll.options.map((option) => option.name).join('\n'),
                })
              .expect(200)
              .then((resp) => {
                assert(resp.body.msg == `Successfully created poll ${poll.name}`);
                done();
              });
            });
          });
  }); // it

  it('returns 302 when not logged in', (done) => {
    factory.build('poll')
    .then((poll) => {
      request(app)
        .post('/api/polls')
        .send(
          {name: poll.name,
            user: poll.user,
            options: poll.options.map((option) => option.name).join('\n'),
          })
        .expect(302, done);
      });
  }); // it

  it('returns 400 on validation error', (done) => {
    factory.create('user')
      .then((user) => {
          passportStub.login(user);

          factory.build('poll')
          .then((poll) => {
            request(app)
              .post('/api/polls')
              .send(
                {name: '',
                  user: poll.user,
                  options: poll.options.map((option) => option.name).join('\n'),
                })
              .expect(400, done);
            });
          });
  });

  it('returns 500 on no options', (done) => {
    factory.create('user')
      .then((user) => {
          passportStub.login(user);

          factory.build('poll')
          .then((poll) => {
            request(app)
              .post('/api/polls')
              .send(
                {name: poll.name,
                  user: poll.user,
                  options: null,
                })
              .expect(500, done);
          });
      });
  });
});

describe('show', () => {
  it('returns 200 ok', (done) => {
    factory.create('poll')
      .then((poll) => {
        request(app)
          .get(`/api/polls/${poll._id}`)
          .expect(200)
          .then((resp) => {
            assert(resp.body._id == poll._id);
            done();
          });
      });
  });

  it('returns 404 with bad id', (done) => {
    factory.create('poll')
      .then((poll) => {
        request(app)
          .get('/api/polls/bad_id')
          .expect(404, done);
      });
  });
});

describe('vote', () => {
  it('returns 201', (done) => {
    factory.create('poll')
      .then((poll) => {
        request(app)
          .post('/api/polls/vote')
          .send(
            {pollId: poll._id,
              optionId: poll.options[0]._id,
            }
          )
          .expect(201)
          .then((resp) => {
            expect(resp.body.msg).to.equal('Vote successful');
            done();
          });
      });
  });

  it('returns 400 with bad params', (done) => {
    factory.create('poll')
      .then((poll) => {
        request(app)
          .post('/api/polls/vote')
          .send({})
          .expect(400)
          .then((resp) => {
            expect(resp.body.msg).to.equal('Failed to update poll');
            done();
          });
      });
  });
});

describe('indexAdmin', () => {
  beforeEach((done) => {
    passportStub.install(app);
    done();
  });

  afterEach((done) => {
    passportStub.logout();
    passportStub.uninstall();
    done();
  });
  it('should return 200 OK', (done) => {
    factory.create('poll')
      .then((poll) => {
        models.User.find({_id: poll.user}, (err, user) => {
          passportStub.login(user);
          request(app)
            .get('/api/polls/admin')
            .expect(200, done);
        });
      });
  });
});

describe('destroy', () => {
  beforeEach((done) => {
    passportStub.install(app);
    done();
  });

  afterEach((done) => {
    passportStub.logout();
    passportStub.uninstall();
    done();
  });

  it('destroys a poll', (done) => {
    factory.create('poll')
      .then((poll) => {
        models.User.find({_id: poll.user}, (err, user) => {
          passportStub.login(user);
          request(app)
            .delete('/api/poll/destroy')
            .send({
              _id: poll._id,
            })
            .expect(200)
            .then((resp) => {
              assert(resp.body.msg == 'Successfully removed poll');
              done();
            });
        });
      });
  });

  it('doesn\'t destroy -- can\'t find', (done) => {
    factory.create('poll')
      .then((poll) => {
        models.User.find({_id: poll.user}, (err, user) => {
          passportStub.login(user);
          request(app)
            .delete('/api/poll/destroy')
            .send({
              _id: null,
            })
            .expect(404)
            .then((resp) => {
              assert(resp.body.msg == 'Poll not removed. It either does not exist or does not belong to you.');
              done();
            });
        });
      });
  });

  it('doesn\'t destroy -- access denied', (done) => {
    // poll belongs to another user

    factory.create('user')
      .then((user) => {
        factory.create('poll')
          .then((poll) => {
            // login as the first user
            passportStub.login(user);
            request(app)
              .delete('/api/poll/destroy')
              .send({_id: poll._id})
              .expect(404)
              .then((resp) => {
                assert(resp.body.msg == 'Poll not removed. It either does not exist or does not belong to you.');
                done();
              });
          });
      });
  });

  it('doesn\'t destroy -- not logged in', (done) => {
    factory.create('poll')
      .then((poll) => {
        models.User.find({_id: poll.user}, (err, user) => {
          request(app)
            .delete('/api/poll/destroy')
            .send({
              _id: poll._id,
            })
            .expect(302, done);
        });
      });
  });
});

describe('addOption', () => {
  beforeEach((done) => {
    passportStub.install(app);
    done();
  });

  afterEach((done) => {
    passportStub.logout();
    passportStub.uninstall();
    done();
  });

  it('adds an option', (done) => {
    factory.create('poll')
      .then((poll) => {
        models.User.find({_id: poll.user}, (err, user) => {
          passportStub.login(user);
          request(app)
            .post('/api/polls/option')
            .send({
              pollId: poll._id,
              optionName: 'some option',
            })
            .expect(200)
            .then((resp) => {
              assert(resp.body.msg == 'Successfully updated poll');
              console.log('almost done!');
              done();
            });
        });
      });
  });
});

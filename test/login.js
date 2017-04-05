// borrowed from here https://jaketrent.com/post/authenticated-supertest-tests/

var superagent = require("superagent");
var agent = superagent.agent();
var theAccount = { email: "nacho", password: "iamtheluchadore" };

exports.login = function (request, done) {
  request.post("/signup")
    .send(theAccount)
    .end(function (err, res) {
      if (err) {
        throw err;
      }
      agent.saveCookies(res);
      done(agent);
    });
  };

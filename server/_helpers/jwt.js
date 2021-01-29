const expressJwt = require('express-jwt');
var fs = require('fs');

module.exports = jwt;

function jwt() {
  // auth with RSA SHA256
  var key = fs.readFileSync(__dirname + '/../cert/authentication.pub');

  return expressJwt({ secret: key, algorithms: ['RS256'] }).unless({
    path: [
      {url: '/health', methods: ['GET']},
      {url: '/service', methods: ['GET']},
      {url: '/user/authenticate', methods: ['POST', 'GET']},
      {url: '/user/register', methods: ['POST']},
    ],
  });
}
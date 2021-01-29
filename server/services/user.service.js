// var config = require('../config/config.json');
// var _ = require('lodash');
// var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');
var Q = require('q');
// var User = require('../model/User.ts');
var mvcIntegatorDb2 = require('mvc-integrator/db/db2/mvc-integrator-db2');

var service = {};

service.authenticate = authenticate;
// service.create = create;

module.exports = service;

/**
 * Function called to authenticate a user on the app.
 * @param {String} email - Email to authenticate
 * @param {String} password - Password to authenticate
 */
function authenticate(email, password) {
  var deferred = Q.defer();

  try {
    mvcIntegatorDb2.getDb().query('SELECT * FROM ' + process.env.DB_SCHEMA + ".USER WHERE email = '" + email + "' AND status = " + 1, function(err, data) {
      if (err) { deferred.resolve('Sorry, something happended. Try later'); } else if (data == null) { deferred.resolve('User did not find.'); } else { deferred.resolve(data); }
    });

    // dataBase.close();
  } catch (error) {
    deferred.reject(error.name + ': ' + error.message);
  }

  return deferred.promise;
}
var userService = require('../services/user.service');
var controller = {};

controller.authenticate = authenticate;

module.exports = controller;

function authenticate(req, res) {
  console.log('In controller - authenticate');

  try {
    console.log(req.body);

    userService.authenticate(req.body.email, req.body.password)
      .then(function(result) {
        console.log(result);

        if (result) {
          res.status(200).send(result);
        } else {
        // authentication failed
          res.status(204).send('Any user was found.');
        }
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).send(err);
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
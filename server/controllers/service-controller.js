var serviceService = require('../services/service.service');
var controller = {};

controller.getAllServices = getAllServices;

module.exports = controller;

function getAllServices(req, res) {
  console.log('In controller - getAllServices');

  try {
    console.log(req.body);

    serviceService.getAllServices()
      .then(function(result) {
        console.log(result);

        if (result) {
          res.status(200).send(result);
        } else {
        // authentication failed
          res.status(204).send('Any service was found.');
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
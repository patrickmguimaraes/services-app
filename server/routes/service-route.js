// import dependencies and initialize the express router
const express = require('express');
const ServiceController = require('../controllers/service-controller');

const router = express.Router();

// define routes
router.get('', ServiceController.getAllServices);

module.exports = router;
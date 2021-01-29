// import dependencies and initialize the express router
const express = require('express');
const UserController = require('../controllers/user-controller');

const router = express.Router();

// define routes
router.post('/authenticate', UserController.authenticate);

module.exports = router;
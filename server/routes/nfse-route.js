// import dependencies and initialize the express router
const express = require('express');
const NFSeController = require('../controllers/nfse-controller');

const router = express.Router();

// define routes
router.get('', NFSeController.getNFEe);

module.exports = router;

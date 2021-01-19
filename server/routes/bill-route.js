// import dependencies and initialize the express router
const express = require('express');
const BillController = require('../controllers/bill-controller');

const router = express.Router();

// define routes
router.post('', BillController.newBill);

module.exports = router;
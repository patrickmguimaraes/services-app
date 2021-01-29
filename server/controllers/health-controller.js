var mvcIntegatorDb2 = require('mvc-integrator/db/db2/mvc-integrator-db2');

// get health of application
exports.getHealth = (req, res) => {
  console.log('In controller - getHealth');

  if (mvcIntegatorDb2.getDb().connected) {
    res.json({status: 'UP' });
  } else {
    res.status(400).json({ status: 'ERR' });
  }
};
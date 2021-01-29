// import dependencies and initialize express
require('dotenv').config();
const express = require('express');
const app = express();
var https = require('https');
var fs = require('fs');
const cors = require('cors');
// const corsOptions = require('./_helpers/cors-options');
const path = require('path');
var mvcIntegratorDb2 = require('mvc-integrator/db/db2/mvc-integrator-db2');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

const UserController = require('./controllers/user-controller');

var publicPath = __dirname + '/../public';
const EmailHelper = require(__dirname + '/_helpers/email');

// Add certificate and privaty key to secury connection HTTPS
var privateKey = fs.readFileSync(__dirname + '/cert/selfsigned.key');
var certificate = fs.readFileSync(__dirname + '/cert/selfsigned.crt');
var credentials = { key: privateKey, cert: certificate };

app.use('/health', require('./routes/health-route'));
app.use('/swagger', require('./routes/swagger-route'));
app.use('/nfse', require('./routes/nfse-route'));
app.use('/bill', require('./routes/bill-route'));
app.use('/service', require('./routes/service-route'));
// app.use('/user', require('./routes/user-route'));

app.use(express.static('public'));
app.use('/static', express.static(publicPath));

app.use(fileUpload({ limits: { fileSize: 5 } }));
// app.use(fileUpload({
// useTempFiles : true,
// tempFileDir : '/tmp/'
// }));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

// Set TimeZone
process.env.TZ = 'America/Sao_Paulo';

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

// Allow CORS access only for the known domains


var whitelist = ['http://localhost:8100'];
var corsOptions = {
  origin: function(origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.get('/user/authenticate', cors(corsOptions), function(req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'});
});

app.post('/user/authenticate', cors(corsOptions), UserController.authenticate);

// default path to serve up index.html (single page application)
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Create a connection with the database and start the server
console.log('Initiating the server...');
mvcIntegratorDb2.connect(process.env.DB_DATABASE, process.env.DB_HOSTNAME, process.env.DB_PORT, process.env.DB_UID, process.env.DB_PWD,
  function startTheServer(db, error) {
    if (db) {
      // start node server
      https.createServer(credentials, app).listen(process.env.API_PORT, () => {
        console.log('Services available in ' + process.env.API_HOST + ':' + process.env.API_PORT + ' on ' + new Date().toISOString());

        // Start the email helper
        EmailHelper.sendEmailPeriodically(11, 40);

        if (process.env.ENV === 'DEV') {
          mvcIntegratorDb2.compareTables(process.env.DB_SCHEMA, __dirname + '/../../services/mvc/services.vuerd.json');
        }
      });

      module.exports = app;
    } else {
      console.log('Unfortunally something happened when initiating the server.\n' + error);
    }
  });
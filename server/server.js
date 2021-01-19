// import dependencies and initialize express
const express = require('express');
var https = require('https');
var fs = require('fs');

const EmailHelper = require(__dirname + '/_helpers/email');

var privateKey = fs.readFileSync(__dirname + '/cert/selfsigned.key');
var certificate = fs.readFileSync(__dirname + '/cert/selfsigned.crt');
var credentials = {key: privateKey, cert: certificate};

const path = require('path');
const bodyParser = require('body-parser');

const healthRoutes = require('./routes/health-route');
const swaggerRoutes = require('./routes/swagger-route');
const nfseRoutes = require('./routes/nfse-route');
const billRoutes = require('./routes/bill-route');

const app = express();


// Set TimeZone
// process.env.TZ = 'America/Sao_Paulo';

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes and api calls
app.use('/health', healthRoutes);
app.use('/swagger', swaggerRoutes);
app.use('/nfse', nfseRoutes);
app.use('/bill', billRoutes);

// default path to serve up index.html (single page application)
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

// start node server
const port = process.env.PORT || 3000;

https.createServer(credentials, app).listen(port, () => {
  console.log(`App UI available https://localhost:${port}`);
  console.log(`Swagger UI available https://localhost:${port}/swagger/api-docs`);

  EmailHelper.sendEmailPeriodically(11, 40);
});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
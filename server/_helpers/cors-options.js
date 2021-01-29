var exportsFunctions = {};

exportsFunctions.getCorsWebAppAdmin = getCorsWebAppAdmin;
exportsFunctions.getCorsAdmin = getCorsAdmin;
exportsFunctions.getCorsWebApp = getCorsWebApp;

module.exports = exportsFunctions;

function getCorsWebAppAdmin() {
  var allowedOriginList = [process.env.HTTP_ORIGIN_WEB, process.env.HTTP_ORIGIN_APP_IOS, process.env.HTTP_ORIGIN_ANDROID, process.env.HTTP_ORIGIN_ADMIN];

  var corsOptions = {
    origin: function(origin, callback) {
      console.log('Cors verifying');
      if (allowedOriginList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
  };

  return corsOptions;
}

function getCorsAdmin() {
  var allowedOriginList = [process.env.HTTP_ORIGIN_ADMIN];

  var corsOptions = {
    origin: function(origin, callback) {
      if (allowedOriginList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  return corsOptions;
}

function getCorsWebApp() {
  var allowedOriginList = [process.env.HTTP_ORIGIN_WEB, process.env.HTTP_ORIGIN_APP_IOS, process.env.HTTP_ORIGIN_ANDROID];

  var corsOptions = {
    origin: function(origin, callback) {
      if (allowedOriginList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  return corsOptions;
}
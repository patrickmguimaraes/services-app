var soap = require('soap');
var fs = require('fs');
var url = '';
var args = { name: 'value' };

// get NFS-e of application
exports.getNFEe = (req, res) => {
  try {
    soap.createClient(url, {
      wsdl_options: {
        cert: fs.readFileSync(__dirname + '/../cert/selfsigned.crt'),
        key: fs.readFileSync(__dirname + '/../cert/selfsigned.key'),
      },
    }, function(err, client) {
      console.log(client);

      if (err) {
        console.error(err);
        res.status(400).send(err);
      } else if (client) {
        client.MyFunction(args, function(err, result) {
          if (err) {
            console.error(err);
            res.status(400).send(err);
          } else {
            console.log(result);
            res.status(200).send(result);
          }
        });
      } else {
        res.status(204);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
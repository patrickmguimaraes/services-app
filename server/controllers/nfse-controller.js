var soap = require('soap');
var url = 'https://nfe.prefeitura.sp.gov.br/ws/lotenfe.asmx?WSDL';
var args = { name: 'value' };

// get NFS-e of application
exports.getNFEe = (req, res) => {
  

  soap.createClient(url, { wsdl_options: {
          cert: fs.readFileSync(__dirname + '/../cert/selfsigned.crt'),
          key: fs.readFileSync(__dirname + '/../cert/selfsigned.key')
      } }, function (err, client) {
    console.log(client);
    if (err) {
      console.error(err);
      res.json({error: err});
    }
    else if (client) {
      client.MyFunction(args, function (err, result) {
        console.log(result);
        res.json(result);
      });
    }
    else {
      console.log('In controller - getNFEe');
      res.json({
        status: 'UP',
      });
    }
  });
};

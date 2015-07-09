var express = require('express');
var request = require('request');

var configureServer = function() {
    var server = express.createServer(    );

    server.configure(
        function() {
            //any static file from the static directory, just return it to user if requested
            server.use(express.static(__dirname + '/public/'));
        }
    );
    return server;
};

var port = process.env.PORT || 9999;
var server = configureServer();


server.get('/token', function (req, res) {
  request({
    url: "https://service.xirsys.com/signal/token",
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: {
        domain : process.env.XIRSYS_DOMAIN,
        application : 'default',
        room : 'default',
        ident : process.env.XIRSYS_IDENT,
        secret : process.env.XIRSYS_SECRET
    }
  },function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(body.d.token);
	  }
	});
});

server.listen(port);
console.log("listening on port "+port);
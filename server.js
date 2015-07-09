var express = require('express');

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

server.listen(port);
console.log("listening on port "+port);
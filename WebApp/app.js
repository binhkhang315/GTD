var express = require('express');
var app = express();
var serverIP = require('./serverIPAddress');
var bodyParser = require('body-parser');
var net = require('net');

app.use(bodyParser.json());
// bodyParser.raw();
app.use(bodyParser.urlencoded({
    extended: false
}));

var ipAddress = serverIP.getIP();

app.set('view engine', 'jade');
//register static directory
app.use(express.static('public'));

app.use('/', require('./route/index.js'));

app.set('port', (process.env.PORT || 3210));
app.set('port', (process.env.PORT || 80));
var server = app.listen(app.get('port'), ipAddress, function () {
    console.log('Listening to:  ' + ipAddress + ':' + app.get('port'));
});

net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    var chunks = {};
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(8080, ipAddress);



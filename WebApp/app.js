var express = require('express');
var app = express();
var serverIP = require('./serverIPAddress');
var bodyParser = require('body-parser');
var fs = require('fs');

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
var server = app.listen(app.get('port'), ipAddress, function () {
    console.log('Listening to:  ' + ipAddress + ':' + app.get('port'));
});

var express = require('express');
var app = express();
var serverIP = require('./serverIPAddress');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
// bodyParser.raw();
app.use(bodyParser.urlencoded({
     extended: false
}));

var ipAddress = serverIP.getIP();

app.set('view engine', 'jade');
app.get('/index', function(req, res) {
    res.sendFile('./googleMap.html', {root: __dirname })
});

app.get('/location', function(req, res){
    res.send({latitude: 10.851648, longitude: 106.743813});
});

app.set('port', (process.env.PORT || 3210));
var server = app.listen(app.get('port'), ipAddress, function() {
     console.log('Listening to:  ' + ipAddress +':'+app.get('port'));
});

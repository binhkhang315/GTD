var express = require('express');
var app = express();
var serverIP = require('./serverIPAddress');
var bodyParser = require('body-parser');
var query  = require('url');
var path = require('path');

app.use(bodyParser.json());
// bodyParser.raw();
app.use(bodyParser.urlencoded({
     extended: false
}));

var ipAddress = serverIP.getIP();

app.set('view engine', 'jade');

//register static directory
app.use(express.static('public'));

app.get('/index', function(req, res) {
    res.sendFile('/index.html', {root: path.join(__dirname, 'public') })
});
console.log(path.join(__dirname,'public'))

app.get('/location', function(req, res){
    res.send({latitude: 106.100, longitude: 10.743813});
});

app.get('/test', function(req, res){
    query.parse(req.url, true).query;
    console.log("longitude: "+req.query.long);
    console.log("latitude: "+ req.query.lat);
    console.log("data: "+ req.query.data);
    console.log("nhiet do: "+ req.query.nhietdo);
    console.log("do am: "+ req.query.doam);
    console.log("speed gps: "+ req.query.speedGPS);
    console.log("time data: "+ req.query.time_data);

    res.send({success: true})
})

app.set('port', (process.env.PORT || 3210));
var server = app.listen(app.get('port'), ipAddress, function() {
     console.log('Listening to:  ' + ipAddress +':'+app.get('port'));
});

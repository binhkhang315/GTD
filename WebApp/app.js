var express = require('express');
var app = express();
var serverIP = require('./serverIPAddress');
var bodyParser = require('body-parser');
var net = require('net');
var path = require('path');

app.use(bodyParser.json());
// bodyParser.raw();
app.use(bodyParser.urlencoded({
    extended: false
}));

var ipAddress = serverIP.getIP();

app.use(express.static('public'));

app.use('/', require('./route/index.js'));

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
    var fs = require("fs");
    fs.writeFile('./log/RealTime/Viewrealtime.txt', '', function(){console.log('delete content file realtime')});
    var datasim = data.toString();
    //var chuoi = "Nhiet do: 30.00 0C | Do am: 57.00 % | $GPRMC,123615.000,A,1045.249695,N,10643.494226,E,5.64,3.54,310123,,E,A   ";
    var datagps = (datasim.substring(38 , 112)).toString();
    var datadht = (datasim.substring(0 , 37)).toString();
    var tocdo = (datasim.substring(87,91)).toString();
    var thoigian = (datasim.substring(45,51)).toString();
    // // xu ly vi do
     var lat_data = (datagps.substring(20 , 31));
     var lati = parseFloat(lat_data);
     var temp1 = parseInt(lati/100);
     var temp2 =(lati - (temp1*100));
    var lati_data = (temp1 + parseFloat(temp2/60)).toFixed(6);
    // xu ly kinh do
    var long_data = (datagps.substring(34 , 46));
    var longi = (parseFloat(long_data));
    var temp3 = (parseInt(longi/100));
    var temp4 = (longi - (temp3*100));
    var longi_data = (temp3 + parseFloat(temp4/60)).toFixed(6);
    //
    console.log(lati_data + '\r\n');
    console.log(longi_data + '\r\n');
    console.log(datagps);
    console.log(datadht);
    // file realtime
    
    var fileName = "Viewrealtime.txt";
    var gps_Data ="lat: " + lati_data  + ", long: " + longi_data + "\r\n";
    fs.appendFile('./log/RealTime/' + fileName, gps_Data, (err) => {
        if (err) throw err;
    });
    console.log('success realtime');
    // file datagps
    var fs = require("fs");
    var d = new Date();
    var day = d.getDate().toString() + "-" + (d.getMonth() + 1).toString() + "-" + d.getFullYear().toString();
    var fileNameGPS = day + "-GPS.txt";
    var gpsData ="lat: " + lati_data  + ", long: " + longi_data + "\r\n";
    fs.appendFile('./log/GPS/' + fileNameGPS, gpsData, (err) => {
        if (err) throw err;
    });
    console.log('success GPS');

    /// file history
    var fs = require("fs");
    var fileNameHistory = day + "-History.txt";
    var historyData =  (datagps + "\n");
    fs.appendFile('./log/History/' + fileNameHistory, historyData, (err) => {
        if (err) throw err;
    });
    console.log('success History');

    /// file dht 11
    var fs = require("fs");
    var fileNameDHT11 = day + "-DHT11.txt";
    var dht11Data = (datadht + " Toc do: " + tocdo + " Km/h | Thoi gian (GMT + 7): " + thoigian + "\r\n");
    fs.appendFile('./log/DHT11/' + fileNameDHT11, dht11Data, (err) => {
        if (err) throw err;
    });
    console.log('success DHT11');
    
    console.log(' DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
    sock.write('You said "' + data + '"');
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(8080, ipAddress);



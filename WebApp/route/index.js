var express = require('express');
var router = express.Router();
var query = require('url');
var path = require('path');
var fs = require('fs');

router.get('/index', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') })
});

router.get('/location', function (req, res) {
    res.send({ latitude: 106.100, longitude: 10.743813 });
});

router.get('/updateGPS', function (req, res) {
    query.parse(req.url, true).query;
    //Get current date
    var d = new Date();
    //format date to String
    var day = d.getDate().toString() + "-" + (d.getMonth() + 1).toString() + "-" + d.getFullYear().toString();
    var time = d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString();
    var fileNameGPS = day + "-GPS.txt";
    var gpsData = time + ", long: " + req.query.long.toString() + ", lat:" + req.query.lat.toString() + "\n";
    fs.appendFile('./log/GPS/' + fileNameGPS, gpsData, (err) => {
        if (err) throw err;
    });
    res.send({ success: true });
});

router.get('/updateHistory', function (req, res) {
    //parse data in url to req.query;
    query.parse(req.url, true).query;
    //Get current date
    var d = new Date();
    //format date to String
    var day = d.getDate().toString() + "-" + (d.getMonth() + 1).toString() + "-" + d.getFullYear().toString();
    var time = d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString();

    var fileNameHistory = day + "-History.txt";
    //Update History file
    var historyData = time + ", " + req.query.data.toString() + "\n";
    fs.appendFile('./log/History/' + fileNameHistory, historyData, (err) => {
        if (err) throw err;
    });
    res.send({success: true});
});

router.get('/updateDHT11', function (req, res) {
    //parse data in url to req.query;
    query.parse(req.url, true).query;
    //Get current date
    var d = new Date();
    //format date to String
    var day = d.getDate().toString() + "-" + (d.getMonth() + 1).toString() + "-" + d.getFullYear().toString();
    var time = d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString();

    var fileNameDHT11 = day + "-DHT11.txt";
    //Update DHT11 file
    var dht11Data = time + ", nhiet do: " + req.query.nhietdo.toString() +
        " doam: " + req.query.doam.toString() +
        " speed GPS: " + req.query.speedGPS.toString() +
        " time data: " + req.query.time_data.toString() + "\n";
    fs.appendFile('./log/DHT11/' + fileNameDHT11, dht11Data, (err) => {
        if (err) throw err;
    });
    res.send({ success: true });
});


router.get('/updateData1', function (req, res) {
    //parse data in url to req.query;
    query.parse(req.url, true).query;
    //Get current date
    var d = new Date();
    //format date to String
    var day = d.getDate().toString() + "-" + (d.getMonth() + 1).toString() + "-" + d.getFullYear().toString();
    var time = d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString();

    //set file name
    var fileNameGPS = day + "-GPS.txt";
    var fileNameHistory = day + "-History.txt";
    var fileNameDHT11 = day + "-DHT11.txt";
    //Update GPS file
    var gpsData = time + ", long: " + req.query.long.toString() + ", lat:" + req.query.lat.toString() + "\n";
    fs.appendFile('./log/GPS/' + fileNameGPS, gpsData, (err) => {
        if (err) throw err;
    });

    //Update History file
    var historyData = time + ", " + req.query.data.toString() + "\n";
    fs.appendFile('./log/History/' + fileNameHistory, historyData, (err) => {
        if (err) throw err;
    });

    //Update DHT11 file
    var dht11Data = time + ", nhiet do: " + req.query.nhietdo.toString() +
        " doam: " + req.query.doam.toString() +
        " speed GPS: " + req.query.speedGPS.toString() +
        " time data: " + req.query.time_data.toString() + "\n";
    fs.appendFile('./log/DHT11/' + fileNameDHT11, dht11Data, (err) => {
        if (err) throw err;
    });
    res.send({ success: true })
});

module.exports = router;

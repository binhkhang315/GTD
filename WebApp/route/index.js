var express = require('express');
var router = express.Router();
var query = require('url');
var path = require('path');
var fs = require('fs');

router.get('/index', function (req, res) {
    res.sendFile('/index.html', { root: path.join(__dirname, '../public') });
});

router.get('/location', function (req, res) {
var fs = require('fs');
var content = fs.readFileSync('./log/RealTime/Viewrealtime.txt', 'utf-8');
console.log(content);
var lat = (content.substring(5 ,14)).toString();
var long = (content.substring(22 , 33)).toString();   
res.send({ latitude: + lat, longitude: + long });
});

module.exports = router;

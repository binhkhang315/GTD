"use strict";
var fs = require('fs');
var json = require('./testFile.json');
var sinhvien = [
    {
        "name": "khang",
        "mssv": "41201577"
    }
]
var data = {
    "name": "huy",
    "mssv": "41301576"
}

sinhvien.push(data);

sinhvien.forEach(function(element){
    console.log(element.name);
    console.log(element.mssv);
});

var str = JSON.stringify(sinhvien);
fs.writeFileSync("testFile.json", str);
console.log(str);
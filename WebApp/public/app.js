
var app = angular.module("myApp", ['ngMap']);

app.controller("mapController", function ($scope, $http) {
    $http.get('/location')
        .success(function (data, status, headers, config) {
            console.log(data.latitude);
            console.log(data.longitude);
            $scope.address = data.latitude.toString() + "," + data.longitude.toString();
        })
        .error(function (data, status, header, config) {
        });
})
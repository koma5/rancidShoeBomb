var app = angular.module("rancidShoeBomb", []);


app.controller("rancidController", function($scope, $http){

  $http.get('http://127.0.0.1:3000/landfills').then(function(response){
    $scope.landfills = response.data;
  });

});

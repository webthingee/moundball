'use strict';

angular.module('moundballApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('Ballerz', function ($scope) {
    $scope.ballerz = [
      { name: 'Joe Doe', row: '21', seat: '20', total: 0 },
      { name: 'Paul Irving', row: '21', seat: '19', total: 1 },
      { name: 'Matt Smith', row: '21', seat: '18', total: 3 },
      { name: 'Jane Molley', row: '21', seat: '17', total: -5 }
    ];

    $scope.ballerTurn = 0;
    $scope.points = 1;

    // ballerTimer

    $scope.currentInning = '1';
    $scope.count = 0;
    $scope.increment = function() { $scope.count++; };
    $scope.givePoints = function() { givePoints($scope) };
  });

function givePoints($scope) {
  var allBallerz = $scope.ballerz.length;
  var ballerIndex = $scope.ballerTurn % $scope.ballerz.length;
  var ballerCurrent = $scope.ballerz[ballerIndex];
  var ballerCurrentTotal = $scope.ballerz[ballerIndex].total;
  $scope.ballerz[ballerIndex].total = ballerCurrentTotal + $scope.points;

  for(var i=1; i < allBallerz; i++) {
    if (ballerIndex != i) {
      console.log($scope.ballerz[i].name + ' : ' + $scope.ballerz[i].total);
      $scope.ballerz[i].total = (-1 + $scope.ballerz[i].total);
    }
  }

  $scope.ballerTurn = $scope.ballerTurn +1;
  console.log(ballerCurrent.name);
  console.log(ballerCurrentTotal + $scope.points);
}

function halfInningChange($scope) {
  $scope.ballerTurn = $scope.ballerTurn + 1;
  $scope.points = $scope.points + 1;
}

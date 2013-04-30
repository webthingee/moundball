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
      { name: 'Julie', row: '21', seat: '20', total: 0 },
      { name: 'Dave', row: '21', seat: '19', total: 0 },
      { name: 'Malia', row: '21', seat: '18', total: 0 },
      { name: 'Sean', row: '21', seat: '17', total: 0 }
    ];

    $scope.ballerTurn = 0;
    $scope.points = 0;

    // ballerTimer

    $scope.increment = function() { $scope.count++; };
    $scope.halfInning = function() { halfInning($scope); };
    $scope.onMound = function() { onMound($scope) };
    $scope.offMound = function() { offMound($scope) };
  });


function halfInning($scope) {
  // Change to correct half inning.
  //
  // Take one point from each baller.
  for(var i=0; i < $scope.ballerz.length; i++) {
    $scope.ballerz[i].total = (-1 + $scope.ballerz[i].total);
  }
  // Set current point award.
  $scope.points = $scope.points + $scope.ballerz.length;

  // Count.
  $scope.counter = $scope.counter + 1;
  $scope.homeAway = $scope.conunter % 2;

  if($scope.counter % 2) {
    $scope.homeAway = "Top of the ";
    $scope.inning = $scope.inning + 1;
  } else {
    $scope.homeAway = 'Bottom of the ';
  }

}

function offMound($scope) {
  halfInning($scope);

  // Advance to next baller.
  $scope.ballerTurn = $scope.ballerTurn +1;
}

function onMound($scope) {
  // The number of ballerz.
  var allBallerz = $scope.ballerz.length;
  // The current position, based on the current turn.
  var ballerIndex = $scope.ballerTurn % $scope.ballerz.length;
  // The current baller.
  var ballerCurrent = $scope.ballerz[ballerIndex];
  // The point total of the current baller.
  var ballerCurrentTotal = $scope.ballerz[ballerIndex].total;

  // Cycle through all the batters to perfrom actions for non winners.
  // for(var i=1; i < allBallerz; i++) {
    // All who are NOT the current baller.
    // if (ballerIndex != i) {
      // console.log($scope.ballerz[i].name + ' : ' + $scope.ballerz[i].total);
      // Take one point away from their total.
      // $scope.ballerz[i].total = (-1 + $scope.ballerz[i].total);
    // }
  // }

  // Actions for winner
  $scope.ballerz[ballerIndex].total = ballerCurrentTotal + $scope.points;
  $scope.points = 0;

  // Advance to next baller.
  $scope.ballerTurn = $scope.ballerTurn +1;

  // Add new points.
  halfInning($scope);

  console.log(ballerCurrent.name);
  console.log(ballerCurrentTotal + $scope.points);
}

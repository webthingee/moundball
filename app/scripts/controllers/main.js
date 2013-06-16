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
      { ballerNumber: 0, name: 'Jose Sandval', row: '21', seat: '20', total: 0 },
      { ballerNumber: 1, name: 'Billy Bobbers', row: '21', seat: '19', total: 0 },
      { ballerNumber: 2, name: 'Hubert Franz', row: '21', seat: '18', total: 0 },
      { ballerNumber: 3, name: 'Colby Nanod', row: '21', seat: '17', total: 0 }
    ];
    $scope.inningResultz = [];

    // set variables
    $scope.ballerTurn = 0;
    $scope.points = 0;
    $scope.started = false;
    $scope.homeAway = 'Beginning';

    // register functions
    $scope.reset = function() { reset($scope); };
    $scope.start = function() { start($scope); };
    $scope.halfInning = function() { halfInning($scope); };
    $scope.onMound = function() { onMound($scope) };
    $scope.offMound = function() { offMound($scope) };
    $scope.anteUp = function() { anteUp($scope) };
    $scope.addResult = function() { addResult($scope) };

  });

function reset($scope) {
  var r = confirm('Do You Really Want to Reset?');
  if (r == true) {
    start($scope)
  }
}

function start($scope) {
  $scope.counter = 0;
  $scope.inning = 0;
  $scope.points = 0;
  for(var i=0; i < $scope.ballerz.length; i++) {
    $scope.ballerz[i].total = 0;
  }

  // Run the half inning process.
  halfInning($scope);

  // Clear the baller turns;
  $scope.ballerTurn = 0;

  // Started is true @todo - perhaps change to inProgress.
  $scope.started = true;

  // Clear the inning results.
  $scope.inningResultz = [];
}

function anteUp($scope) {
  // If the game has not started, we want to run the start function.
  if($scope.started == false) {
    start($scope);
  }
  //start($scope);
  // Take one point from each baller.
  for(var i=0; i < $scope.ballerz.length; i++) {
    $scope.ballerz[i].total = (-1 + $scope.ballerz[i].total);
  }
  // Set current point award.
  $scope.points = $scope.points + $scope.ballerz.length;

  // The the ante to be placed, the inning is NOW active
  // and awating the resting position to be determined.
  $scope.inningActive = true;

}

function halfInning($scope) {
  // Count.
  $scope.counter = $scope.counter + 1;
  $scope.homeAway = $scope.conunter % 2;

  if($scope.counter % 2) {
    $scope.homeAway = 'Top'
    $scope.inning = $scope.inning + 1;
  } else {
    $scope.homeAway = 'Bottom';
  }

}

function offMound($scope) {
  // Advance to next baller.
  $scope.ballerTurn = $scope.ballerTurn +1;

  // Last ball result.
  $scope.ballResult = 'Off';

  // Post the results.
  addResult($scope);

  // Add new points.
  // Advance to next inning.
  halfInning($scope);

  // The inning is not active after the points are awarded.
  // We wait for the ante to be placed before setting back to
  // an active inning.
  $scope.inningActive = false;
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

  // Last ball result.
  $scope.ballResult = 'On';

  // Actions for winner
  $scope.ballerz[ballerIndex].total = ballerCurrentTotal + $scope.points;
  $scope.points = 0;

  // Post the results.
  addResult($scope);

  // Advance to next baller.
  $scope.ballerTurn = $scope.ballerTurn +1;

  // Add new points.
  // Advance to next inning.
  halfInning($scope);

  // The inning is not active after the points are awarded.
  // We wait for the ante to be placed before setting back to
  // an active inning.
  $scope.inningActive = false;

  //console.log($scope.ballerz);
  //console.log(ballerCurrentTotal + $scope.points);
}

function addResult($scope) {
  console.log($scope.ballerTurn);

  var newItem =
    { inningNumber: $scope.inning, inningHalf: $scope.homeAway, ballResult: $scope.ballResult };

  $scope.inningResultz.push(newItem);
  console.log($scope.inningResultz);
}
/**
 *
 incremental changes keep and write to an array
 put in twitter accounts?
 better score indicator? visual?
 store player data in the localStorage?
 set the point value?
 MoundBallApp MoUnDbAlL ? using webthingee@gmail.com

 */
function PagesController($scope, $http, $route, $routeParams, $compile) {
  $route.current.templateUrl = 'views/' + $routeParams.name + ".html";
  $http.get($route.current.templateUrl).then(function (msg) {
    $('#view').html($compile(msg.data)($scope));
  });

}
PagesController.$inject = ['$scope', '$http', '$route', '$routeParams', '$compile'];

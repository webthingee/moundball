'use strict';

angular.module('moundballApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

// function MainCtrl($scope) {
//   $scope.count = 0;
//   $scope.increment = function() { $scope.count++; };
// }

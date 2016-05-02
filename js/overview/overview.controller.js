/**
 * Created by Steven Brice on 5/1/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.overview', [])
    .controller('OverviewController', OverviewController);

  OverviewController.$inject = ['$rootScope', '$scope', '$http', '$state', 'VividSeatsService'];
  function OverviewController($rootScope, $scope, $http, $state, VSeats) {
    $scope.events = [];

    $scope.getDate = function(dateString) {
      return Date.parse(dateString);
    };

    VSeats.eventService.all(
      function(evts){
        $scope.$apply(function() {
          $scope.events = evts;
        });
      },
      function(msg){
        $scope.$apply(function() {
          alert('Error: ' + msg);
          $scope.events = [];
        });
      }
    );
  }
})();
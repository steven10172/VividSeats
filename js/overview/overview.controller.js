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
    /**
     * Store Events that will be displayed in the UI
     * @type {Array}
     */
    $scope.events = [];

    /**
     * Turn Date String into date object
     * @param dateString
     * @returns {number}
     */
    $scope.getDate = function(dateString) {
      return Date.parse(dateString);
    };

    /**
     * Load Events from API
     */
    function loadEvents() {
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

    loadEvents();
  }
})();
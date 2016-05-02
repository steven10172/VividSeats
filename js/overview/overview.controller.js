/**
 * Created by Steven Brice on 5/1/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.overview', [])
    .controller('OverviewController', OverviewController);

  OverviewController.$inject = ['$rootScope', '$scope', '$http', '$state', 'VividSeatsService', 'toaster'];
  function OverviewController($rootScope, $scope, $http, $state, VSeats, toaster) {
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
     * Remove Event
     * @param evt
     */
    $scope.removeEvent = function(evt) {
      if(window.confirm('Are you sure you want to remove this event?')) {
        $scope.$eval(function() {
          VSeats.eventService.remove(evt,
            function(msg) {
              toaster.pop('success', "Success", "The event was removed successfully!");
              loadEvents();
            },
            function(msg) {
              toaster.pop('error', "Error", "There was an error removing the event!");
              loadEvents();
            }
          );
        });
      }
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
            toaster.pop('error', "Error", "There was an error retrieving events!");
            $scope.events = [];
          });
        }
      );
    }

    loadEvents();
  }
})();
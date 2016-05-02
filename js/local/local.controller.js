/**
 * Created by Steven Brice on 5/1/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.local', [])
    .controller('LocalController', LocalController);

  LocalController.$inject = ['$rootScope', '$scope', '$http', '$state', 'VividSeatsService', 'toaster'];
  function LocalController($rootScope, $scope, $http, $state, VSeats, toaster) {
    /**
     * Store Events that will be displayed in the UI
     * @type {Array}
     */
    $scope.eventsPerCity = {};
    $scope.totalEvents = 0;

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
            $scope.totalEvents = evts.length;
            groupByCity(evts);
          });
        },
        function(msg){
          $scope.$apply(function() {
            toaster.pop('error', "Error", "There was an error retrieving events!");
            $scope.eventsPerCity = {};
          });
        }
      );
    }

    /**
     * Group the events by each day
     * @param evts
     */
    function groupByCity(evts) {
      evts.forEach(function(evt) {
        var city = evt.venue.city + evt.venue.state;

        // Check to see if the date has already been setup
        if(typeof $scope.eventsPerCity[city] !== typeof {}) {

          // Set the date and create an empty array for the events
          $scope.eventsPerCity[city] = {
            city: evt.venue.city,
            events: []
          };
        }

        // Add the event to the specific day
        $scope.eventsPerCity[city].events.push(evt);
      });
    }

    loadEvents();
  }
})();
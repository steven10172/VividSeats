/**
 * Created by Steven Brice on 5/1/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.upcoming', [])
    .controller('UpcomingController', UpcomingController);

  UpcomingController.$inject = ['$rootScope', '$scope', '$http', '$state', 'VividSeatsService', 'toaster'];
  function UpcomingController($rootScope, $scope, $http, $state, VSeats, toaster) {
    /**
     * Store Events that will be displayed in the UI
     * @type {Array}
     */
    $scope.eventsPerDay = {};
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
            groupByDay(evts);
          });
        },
        function(msg){
          $scope.$apply(function() {
            toaster.pop('error', "Error", "There was an error retrieving events!");
            $scope.eventsPerDay = {};
          });
        }
      );
    }

    /**
     * Return the YYYYMMDD for the dateString
     * @param dateString
     * @returns {string}
     */
    function getYYYYMMDD(dateString) {
      var date = new Date(dateString);

      return date.getFullYear() + ':' + date.getMonth() + ':' + date.getDay();
    }

    /**
     * Group the events by each day
     * @param evts
     */
    function groupByDay(evts) {
      evts.forEach(function(evt) {
        var YYYYMMDD = getYYYYMMDD(evt.date);

        // Check to see if the date has already been setup
        if(typeof $scope.eventsPerDay[YYYYMMDD] !== typeof {}) {

          // Set the date and create an empty array for the events
          $scope.eventsPerDay[YYYYMMDD] = {
            date: evt.date,
            events: []
          };
        }

        // Add the event to the specific day
        $scope.eventsPerDay[getYYYYMMDD(evt.date)].events.push(evt);
      });
    }

    loadEvents();
  }
})();
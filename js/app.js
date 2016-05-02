/**
 * Created by Steven Brice on 5/1/2016.
 */

(function() {
  'use strict';

  angular
    .module('vividseats', [
      'app.routes',
      'app.overview',
      'app.local',
      'app.upcoming'
    ])
    .factory("VividSeatsService", function ($window) {
      // Create a service to wrap access to the Global library
      return $window.VividSeats;
    });

})();
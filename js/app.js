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
      'app.upcoming',
      'toaster',
      'xeditable'
    ])
    .factory("VividSeatsService", function ($window) {
      // Create a service to wrap access to the Global library
      return $window.VividSeats;
    })
    .run(function(editableOptions) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme
    })
    .filter('toArray', function () {
      // Convert Array to object to allow ng-repeat to sort the dates by order
      //https://github.com/petebacondarwin/angular-toArrayFilter/blob/master/toArrayFilter.js
      return function (obj, addKey) {
        if (!angular.isObject(obj)) return obj;
        if ( addKey === false ) {
          return Object.keys(obj).map(function(key) {
            return obj[key];
          });
        } else {
          return Object.keys(obj).map(function (key) {
            var value = obj[key];
            return angular.isObject(value) ?
              Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
            { $key: key, $value: value };
          });
        }
      };
    });

})();
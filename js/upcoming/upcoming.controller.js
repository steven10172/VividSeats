/**
 * Created by Steven Brice on 5/1/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.upcoming', [])
    .controller('UpcomingController', UpcomingController);

  UpcomingController.$inject = ['$rootScope', '$scope', '$http', '$state'];
  function UpcomingController($rootScope, $scope, $http, $state) {
    //
  }
})();
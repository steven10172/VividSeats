/**
 * Created by Steven Brice on 5/1/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.overview', [])
    .controller('OverviewController', OverviewController);

  OverviewController.$inject = ['$rootScope', '$scope', '$http', '$state'];
  function OverviewController($rootScope, $scope, $http, $state) {
    //
  }
})();
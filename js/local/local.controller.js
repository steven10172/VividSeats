/**
 * Created by Steven Brice on 5/1/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.local', [])
    .controller('LocalController', LocalController);

  LocalController.$inject = ['$rootScope', '$scope', '$http', '$state'];
  function LocalController($rootScope, $scope, $http, $state) {
    //
  }
})();
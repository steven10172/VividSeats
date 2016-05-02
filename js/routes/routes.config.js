/**
 * Created by Steven Brice on 5/1/2016.
 */

(function() {
  'use strict';

  angular
    .module('app.routes', ['ui.router'])
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  function routesConfig($stateProvider, $locationProvider, $urlRouterProvider){

    $locationProvider.html5Mode(false);

    // defaults to overview
    $urlRouterProvider.otherwise('/app/overview');

    //
    // Routes
    //
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/app.html'
      })
      .state('app.overview', {
        url: '/overview',
        title: 'Overview',
        templateUrl: 'views/overview.html'
      })
      .state('app.local', {
        url: '/local',
        title: 'Local',
        templateUrl: 'views/local.html'
      })
      .state('app.upcoming', {
        url: '/upcoming',
        title: 'Upcoming',
        templateUrl: 'views/upcoming.html'
      })
    ;

  }

})();


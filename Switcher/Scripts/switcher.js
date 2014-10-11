'use strict';

angular.module('switcher', ['ngAudio', 'ngSanitize', 'ngResource', 'ui.router', 'angularMoment', 'timer', 'angular-chrono'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;

'use strict';

angular.module('switcher', ['ngSanitize', 'ngResource', 'ui.router', 'angularMoment', 'timer', 'angular-chrono'])
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

'use strict';

angular.module('switcher')
    .controller('MainCtrl', function ($scope, $interval, chronoService) {
        var TICK = 1000,
            player = $scope.player = {
                state: false,
                track: false,
                time: 0,
                percent: 0
            },
            playlist = $scope.playlist = [
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule other world","Descrition":"Wann rule u all!!, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000 * 2,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":150000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":150000,"HasChildren":false},
            ],
            index = 0,
            stop;

        angular.extend(
            $scope,
            {
                STATE: '',
                DEFAULT: 'DEFAULT',
                PREVIEW: 'PREVIEW',
                showDesc: function(track) {
                    $scope.selectedTrack = track;
                }
            }
        );
        function init() {
            $scope.STATE = $scope.DEFAULT;
            formatTime();
        }

        function startTimer() {
            player.time = player.time || player.track.DurationSecs;

            formatTime();
            stop = $interval(tick,
                TICK / 100,
                Math.round(player.time / 1000)
            );
            stop.then(onStopTime);
        }

        function onStopTime() {
            if(playlist[index]) {
                changeTrack();
                startTimer();
            }
        }

        function changeTrack() {
            player.track = playlist[index++];
        }

        function formatTime() {
            $scope.millis = player.time;
            calculateTimeUnits();
        }

        function tick() {
            player.percent = 100 - player.time / player.track.DurationSecs * 100;
            player.time -= TICK;
            formatTime();
        }

        function calculateTimeUnits() {

            // compute time values based on maxTimeUnit specification
            if (!$scope.maxTimeUnit || $scope.maxTimeUnit === 'day') {
                $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                $scope.days = Math.floor((($scope.millis / (3600000)) / 24));
                $scope.months = 0;
                $scope.years = 0;
            } else if ($scope.maxTimeUnit === 'second') {
                $scope.seconds = Math.floor($scope.millis / 1000);
                $scope.minutes = 0;
                $scope.hours = 0;
                $scope.days = 0;
                $scope.months = 0;
                $scope.years = 0;
            } else if ($scope.maxTimeUnit === 'minute') {
                $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                $scope.minutes = Math.floor($scope.millis / 60000);
                $scope.hours = 0;
                $scope.days = 0;
                $scope.months = 0;
                $scope.years = 0;
            } else if ($scope.maxTimeUnit === 'hour') {
                $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                $scope.hours = Math.floor($scope.millis / 3600000);
                $scope.days = 0;
                $scope.months = 0;
                $scope.years = 0;
            } else if ($scope.maxTimeUnit === 'month') {
                $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
                $scope.months = Math.floor((($scope.millis / (3600000)) / 24) / 30);
                $scope.years = 0;
            } else if ($scope.maxTimeUnit === 'year') {
                $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
                $scope.months = Math.floor((($scope.millis / (3600000)) / 24 / 30) % 12);
                $scope.years = Math.floor(($scope.millis / (3600000)) / 24 / 365);
            }
            // plural - singular unit decision
            $scope.secondsS = $scope.seconds == 1 ? '' : 's';
            $scope.minutesS = $scope.minutes == 1 ? '' : 's';
            $scope.hoursS = $scope.hours == 1 ? '' : 's';
            $scope.daysS = $scope.days == 1 ? '' : 's';
            $scope.monthsS = $scope.months == 1 ? '' : 's';
            $scope.yearsS = $scope.years == 1 ? '' : 's';
            //add leading zero if number is smaller than 10
            $scope.sseconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
            $scope.mminutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
            $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
            $scope.ddays = $scope.days < 10 ? '0' + $scope.days : $scope.days;
            $scope.mmonths = $scope.months < 10 ? '0' + $scope.months : $scope.months;
            $scope.yyears = $scope.years < 10 ? '0' + $scope.years : $scope.years;

        }

        $scope.play = function() {
            if (! player.track) {
                changeTrack();
            }
            startTimer();
            player.state = true;
        };

        $scope.stop = function() {
            $interval.cancel(stop);
            player.state = false;
        };

        init();
    });

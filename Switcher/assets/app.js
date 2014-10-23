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

'use strict';

angular.module('switcher')
    .directive('timeFormat', function ($compile) {

        return {
            scope: {
                millis: '=timeFormat'
            },
            controller: function ($scope, $element) {
                $element.append($compile($element.contents())($scope));

                $scope.$watch('millis', function(value) {
                    calculateTimeUnits($scope);
                });

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
            }
        }
    });
'use strict';

angular.module('switcher')
    .controller('MainCtrl', function ($scope, ngAudio, $interval, Player) {
        var TICK = 1000,
            player = $scope.player = new Player();

        angular.extend(
            $scope,
            {
                STATE: '',
                DEFAULT: 'DEFAULT',
                PREVIEW: 'PREVIEW',
                showDesc: function(track) {
                    $scope.selectedTrack = track;
                },
                next: function() {
                    player.nextTrack();
                    player.startTrack();
                },
                prev: function() {
                    player.prevTrack();
                    player.startTrack();
                },
                play: function() {
                    player.startTrack();
                },
                stop: function() {
                    player.stopTrack();
                },
                selectTrack: function(track) {
                    if ($scope.selectedTrack && $scope.selectedTrack == track) {
                        $scope.selectedTrack = undefined;
                    }
                    else {
                        $scope.selectedTrack = track;
                    }
                }
            }
        );

        function init() {
            $scope.STATE = $scope.DEFAULT;
            $scope.playlist = player.playlist;

        }

        $scope.win = function() {
            $scope.isWin = true;
        }
        /*
        function startTrack() {
            player.time = player.time || player.track.DurationSecs;


            stop = $interval(tick,
                TICK / 100,
                Math.round(player.time / 1000)
            );
            stop.then(onStopTime);
        }

        function onStopTime() {
            if(playlist[index]) {
                startTrack();
            }
        }

        function changeTrack() {
            stopTrack();
            player.track = playlist[index++];
        }

        function tick() {
            player.percent = 100 - player.time / player.track.DurationSecs * 100;
            player.time -= TICK;
        }


        function stopTrack() {
            $interval.cancel(stop);
            player.state = false;
        }
        */

        init();
    });

'use strict';

angular.module('switcher')
    .factory('Player', function($interval, ngAudio) {
        var TICK = 1000;
        function Player() {

            this.playlist = [
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule other world","Descrition":"Wann rule u all!!, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000 * 2,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":1500000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":150000,"HasChildren":false},
                {"Tasks":[],"Id":2,"Name":"Rule the world","Descrition":"Wann rule u all, sux0rz!","Start":"\/Date(1412996660960)\/","DurationSecs":150000,"HasChildren":false},
            ];

            this.playlist = [
                {"Tasks":[],"Id":1,"Name":"Be cool!","Description":"Rule it!","Start":"2014-10-11T14:58:06.427","DurationSecs":60000,"IsInPlay":false,"IsActive":false,"ShowNext":false,"ShowNotification":false,"HasChildren":false},{"Tasks":[{"Tasks":[],"Id":3,"Name":"Introduction","Description":"Intrdouctions. Short review of the concept.","Start":"2014-10-11T14:58:06.427","DurationSecs":60000,"IsInPlay":false,"IsActive":false,"ShowNext":false,"ShowNotification":false,"HasChildren":false},{"Tasks":[],"Id":4,"Name":"Say something awesome","Description":"Now say something cool to own them!","Start":"2014-10-11T15:00:06.427","DurationSecs":60000,"IsInPlay":false,"IsActive":false,"ShowNext":false,"ShowNotification":true,"HasChildren":false},{"Tasks":[],"Id":5,"Name":"Be cool!","Description":"Just Do It!","Start":"2014-10-11T15:03:26.427","DurationSecs":60000,"IsInPlay":false,"IsActive":false,"ShowNext":false,"ShowNotification":false,"HasChildren":false}],"Id":2,"Name":"Start Presentation","Description":"Start Presentation on Kalitaska software","Start":"2014-10-11T14:58:06.427","DurationSecs":60000,"IsInPlay":false,"IsActive":false,"ShowNext":false,"ShowNotification":false,"HasChildren":true},{"Tasks":[],"Id":3,"Name":"Introduction","Description":"Intrdouctions. Short review of the concept.","Start":"2014-10-11T14:58:06.427","DurationSecs":60000,"IsInPlay":false,"IsActive":false,"ShowNext":false,"ShowNotification":false,"HasChildren":false},{"Tasks":[],"Id":4,"Name":"Say something awesome","Description":"Now say something cool to own them!","Start":"2014-10-11T15:00:06.427","DurationSecs":60000,"IsInPlay":false,"IsActive":false,"ShowNext":false,"ShowNotification":true,"HasChildren":false},
                {"Tasks":[],"Id":5,"Name":"Rule the world","Description":"Just Do It!","Start":"2014-10-11T15:03:26.427","DurationSecs":60000,"IsInPlay":false,"IsActive":false,"ShowNext":false,"ShowNotification":false,"HasChildren":false}];
        }
        angular.extend(Player.prototype, {
            index: -1,
            playlist: [],
            time: 0,
            stop: false,
            isPlaying: false,
            percent: 0,
            startTrack: function() {
                if(! this.isPlaying) {

                    var self = this;

                    if (! self.track) {
                        self.nextTrack();
                    }

                    self.time = self.time || self.track.DurationSecs;

                    self.stop = $interval(function() {
                            self.onTick();
                        },
                            TICK / 10,
                        Math.round(self.time / 1000)
                    );

                    self.stop.then(function() {
                        var sound = ngAudio.play("assets/Demo.mp3");
                        self.nextTrack();
                        self.startTrack();
                    });

                    self.isPlaying = true;
                }

            },
            onTick: function() {
                this.percent = 100 - this.time / this.track.DurationSecs * 100;
                this.time -= TICK;
            },
            stopTrack: function() {
                if (this.isPlaying) {

                    $interval.cancel(this.stop);
                    this.isPlaying = false;
                }

            },
            nextTrack: function() {
                this.stopTrack();
                if (this.playlist[this.index + 1]) {
                    this.track = this.playlist[++this.index];
                    this.time = this.track.DurationSecs;
                }
            },
            prevTrack: function() {
                this.stopTrack();
                if (this.playlist[this.index - 1]) {
                    this.track = this.playlist[--this.index];
                    this.time = this.track.DurationSecs;
                }
            }
        });

        return Player;
    });
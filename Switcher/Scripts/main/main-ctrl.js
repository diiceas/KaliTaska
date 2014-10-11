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

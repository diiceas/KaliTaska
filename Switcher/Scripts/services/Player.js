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
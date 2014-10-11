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
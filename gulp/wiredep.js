'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('Switcher/styles/*.scss')
    .pipe(wiredep({
        directory: 'Switcher/bower_components'
    }))
    .pipe(gulp.dest('Switcher/styles'));

  gulp.src('Switcher/Views/Home/index.cshtml')
    .pipe(wiredep({
      directory: 'Switcher/bower_components',
      exclude: ['bootstrap']
    }))
    .pipe(gulp.dest('Switcher/Views/Home/'));
});

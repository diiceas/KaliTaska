'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles', 'scripts'] ,function () {
  gulp.watch('Switcher/styles/**/*.less', ['styles']);
  gulp.watch('Switcher/scripts/**/*.js', ['scripts']);
  gulp.watch('Switcher/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});

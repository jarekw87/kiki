(function () {
  'use strict';

  var appSources = 'app/**/*.*',
    dist = './dist/';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();

  var del = require('del');
  var sassdoc = require('sassdoc');

  var packageJson = require('./package.json');

  gulp.task('doc', function () {
    var options = {
        dest: 'doc',
        verbose: true,
    };
    return gulp.src(appSources)
    .pipe(sassdoc());
  });

  gulp.task('clean', function (cb) {
    return del([dist + '**'], cb);
  });

  gulp.task('copy-app', ['clean'], function () {
    return gulp.src(appSources)
      .pipe(gulp.dest(dist));
  });

  gulp.task('default', ['copy-app']);
})();
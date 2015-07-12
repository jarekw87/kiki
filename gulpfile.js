(function () {
  'use strict';

  var appSources = 'app/**/*.*',
      dist = './dist/',

      gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      runSequence = require('run-sequence'),
      bump = require('gulp-bump'),
      gutil = require('gulp-util'),
      git = require('gulp-git'),
      fs = require('fs'),
      del = require('del'),
      sassdoc = require('sassdoc');

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

  gulp.task('dist', ['copy-app']);

  gulp.task('bump-version', ['dist'], function () {
    return gulp.src(['./bower.json', './package.json'])
      .pipe(bump({type: "patch"}).on('error', gutil.log))
      .pipe(gulp.dest('./'));
  });

  gulp.task('commit-changes', ['bump-version'], function () {
    return gulp.src('.')
      .pipe(git.commit('[Prerelease] Bumped version number', {args: '-a'}));
  });

  gulp.task('push-changes', ['commit-changes'], function (cb) {
    git.push('origin', 'master', cb);
  });

  gulp.task('create-new-tag', ['push-changes'], function (cb) {
    var version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, function (error) {
      if (error) {
        return cb(error);
      }
      git.push('origin', 'master', {args: '--tags'}, cb);
    });

    function getPackageJsonVersion () {
      return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    };
  });

  gulp.task('release', ['create-new-tag']);

})();
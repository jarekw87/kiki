(function () {
    'use strict';

    var gulp = require('gulp'),
        rename = require('gulp-rename'),
        plumber = require('gulp-plumber'),
        gutil = require('gulp-util'),
        cmq = require('gulp-combine-media-queries'),
        sass = require('gulp-sass'),
        $ = require('gulp-load-plugins')();


    gulp.task('dev', function () {
        gulp.watch(['scss/**/*.{css,scss}'], ['styles']);
        gulp.watch(['../app/**/*.{css,scss}'], ['styles']);
    });

    gulp.task('styles', function () {
        return gulp.src('scss/style.scss')
            .pipe(plumber())
            .pipe(sass({
                errLogToConsole: true
            }))
            .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(cmq())
            .pipe(gulp.dest('css'))
            .pipe($.size({ showFiles: true }))
            .on('error', gutil.log);
    });

    gulp.task('default', ['dev']);

})();
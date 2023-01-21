'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;


function buildStyles() {
  return gulp.src('./scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
};

function buildScripts() {
  return gulp.src('./scripts/main.js')
    .pipe(uglify()) 
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.stream());
};

function watch(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "/index.html"
    }
  });
  gulp.watch('./scss/**/*.scss', gulp.series(buildStyles));
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./scripts/main.js', gulp.series(buildScripts)).on('change', browserSync.reload);
  cb();
};

exports.buildStyles = buildStyles;
exports.buildScripts = buildScripts;
exports.default = watch;
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');

var production = process.env.NODE_ENV === 'production';

var dependencices = [
  'react',
  'react-dom',
  'react-router'
];

gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencices)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false}))))
    .pipe(gulp.dest('public/js'));
});

gulp.task('browserify', ['browserify-vendor'], function() {
  return browserify('src/client/app.js')
    .external(dependencices)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false}))))
    .pipe(gulp.dest('public/js'));
});

gulp.task('browserify-watch', ['browserify-vendor'], function() {
  var bundler = watchify(browserify('src/client/app.js', watchify.args));
  bundler.external('dependencices');
  bundler.transform(babelify);
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finish rebundling'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/js'));
  }
});

gulp.task('styles', function() {
  return gulp.src('asset/css/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('asset/css/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'browserify-watch', 'watch']);
gulp.task('build', ['styles', 'browserify']);
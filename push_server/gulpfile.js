/**
 * Gulp file for building and running all Push Server tasks.
 */

var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var config = require('config');
var gulp = require('gulp');
var gulpInsert = require('gulp-insert');
var gutil = require('gulp-util');
var header = require('gulp-header');
var minifyHTML = require('gulp-minify-html');
var ngTemplates = require('gulp-angular-templatecache');
var path = require('path');

var WWW_DIR = path.join(__dirname, 'www');
var RELEASE_DIR = path.join(WWW_DIR, 'release');

var paths = {
  assets: [path.join(WWW_DIR, 'index.html')],
  js: [path.join(WWW_DIR, 'js/**/*.js')],
  templates: [path.join(WWW_DIR, 'templates/**/*.html')]
};

var targets = {
  css: path.join(RELEASE_DIR, 'css'),
  js: path.join(RELEASE_DIR, 'js')
};

var buildConstants = function() {
  // Build an abbreviated version of the constants to pass through to the frontend
  var constants = {
    SUPPORTED_CHANNELS: config.get('SUPPORTED_CHANNELS'),
    APPLICATION: config.get('APPLICATION')
  };
  return 'var pushServerSettings = ' + JSON.stringify(constants) + ';\n\n';
};

gulp.task('css', function() {
  gulp.src([path.join(WWW_DIR, 'css/push_server.css')])
    .on('error', gutil.log)
    .pipe(concat('push_server.min.css'))
    .pipe(gulp.dest(RELEASE_DIR));
});

gulp.task('templates', function() {
  console.log('Compiling ng templates to a templates file');
  // This is a bit hacky - it sets up required boilerplate to use the templates as a separate module
  var templatesPrepend = 'var pushServerTemplates = angular.module("pushNotification.templates", []);\n';
  gulp.src(paths.templates)
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(ngTemplates('templates.js', {'module': 'pushNotification.templates'}))
    .pipe(gulpInsert.prepend(templatesPrepend))
    .pipe(gulp.dest(path.join(WWW_DIR, 'templates')));
});

// TODO(leah): pick up debug mode
gulp.task('jsBuild', function () {
  console.log('Compiling PushServer JS files');
  gulp.src([path.join(WWW_DIR, 'js/app.js')])
    .on('error', gutil.log)
    .pipe(browserify({
      insertGlobals: true,
      debug: !gutil.env.production
    }))
    // Stuff application settings into a top level var in the file
    .pipe(header(buildConstants()))
    // Bundle to a single file and output to the release dir
    .pipe(concat('push_server.min.js'))
    .pipe(gulp.dest(RELEASE_DIR));
});

gulp.task('js', ['templates', 'jsBuild']);

gulp.task('default', ['css', 'js']);

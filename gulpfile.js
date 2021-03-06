/* ***************
 * NODE PACKAGES *
 * ***************/

var gulp = require('gulp'),
  bower = require('gulp-bower'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  react = require('gulp-react'),
  nodemon = require('gulp-nodemon'),
  env = require('gulp-env');
  

/* ************
 * FILE PATHS *
 * ************/

var path = {};

/* Directories */
path.BOWER_COMPONENTS_DIR = './bower_components';
path.BUILD_DIR = './client/build';
path.SERVER_DIR = './server';
path.DIST_JS_DIR = './client/dist/js';
path.DIST_CSS_DIR = './client/dist/css';

/* Vendor */
path.VENDOR_JS_SRC = [
  './bower_components/jquery/dist/jquery.js',
  './bower_components/bootstrap/dist/js/bootstrap.js',
  './bower_components/bootstrap-plugin/ie10-viewport-bug-workaround.js',
  './bower_components/react/react.js',
  './bower_components/react/JSXTransformer.js',
  './bower_components/react-router/build/umd/ReactRouter.js',
  './bower_components/flux/dist/Flux.js',
  './bower_components/microevent/microevent.js',
  './bower_components/url/url.js'
];
path.VENDOR_JS_MIN = 'vendor.min.js';
path.VENDOR_CSS_SRC = [
  './bower_components/normalize.css/normalize.css',
  './bower_components/bootstrap/dist/css/bootstrap-theme.css',
  './bower_components/bootstrap/dist/css/bootstrap.css'
];
path.VENDOR_CSS_MIN = 'vendor.min.css';

/* App */
path.APP_JS_SRC = [
  './client/build/js/services/*',
  './client/build/js/stores/*',
  './client/build/js/views/*',
  './client/build/js/app.jsx',
  './client/build/js/dispatcher/*'
];
path.APP_JS_MIN = 'app.min.js';
path.APP_CSS_SRC = [
  './client/build/css/style.css'
];
path.APP_CSS_MIN = 'app.min.css';

/* Dev Task
 * Watches the build directory for saved changes,
 * then automatically reruns the build task.
 */
gulp.task('dev', ['build', 'set-env', 'nodemon', 'dev-watch']);

gulp.task('dev-watch', function() {
  gulp.watch([
    path.BUILD_DIR + '/**/**/*',
    path.SERVER_DIR + '/**/**/*'
  ], ['build']);
});

gulp.task('nodemon', function() {
  nodemon({ script: './server/server.js'})
    .on('restart', function() {
      console.log('restarted!')
    });
});

gulp.task('set-env', function() {
  env({
    file: '.env.json'
  });
});

/* Build Task
 * Fetches, uglifies, and concatenates bower, app, and css components.
 */
gulp.task('build', ['vendor', 'app']);
gulp.task('vendor', function() {
  gulp.src(path.VENDOR_JS_SRC)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat(path.VENDOR_JS_MIN))
    .pipe(gulp.dest(path.DIST_JS_DIR));

  gulp.src(path.VENDOR_CSS_SRC)
    .pipe(plumber())
    .pipe(concat(path.VENDOR_CSS_MIN))
    .pipe(gulp.dest(path.DIST_CSS_DIR));
});
gulp.task('app', function() {
  gulp.src(path.APP_JS_SRC)
    .pipe(plumber())
    .pipe(react())
    .pipe(uglify())
    .pipe(concat(path.APP_JS_MIN))
    .pipe(gulp.dest(path.DIST_JS_DIR));

  gulp.src(path.APP_CSS_SRC)
    .pipe(plumber())
    .pipe(concat(path.APP_CSS_MIN))
    .pipe(gulp.dest(path.DIST_CSS_DIR));
});

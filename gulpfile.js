// Define all required variables
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
   imagemin = require('gulp-imagemin'),
   htmlmin = require('gulp-htmlmin'),
   gulpLiveServer = require('gulp-live-server'),
   jshint = require('gulp-jshint'),
   stylish = require('jshint-stylish');

// Default taks
// Run all default task when type "gulp" on terminal
gulp.task('default', ['sass', 'js', 'htmlmin', 'image','watch', 'serve']);

// Sass Task
gulp.task('sass', function () {
 // Define a folder to listen - All files witch has .scss extension
 return gulp.src('assets/src/sass/**/*.scss')
   // Concatenate all files in the above directory
   .pipe(concat('style.min.css'))
   // Compress Sass file into css folder
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   // Define dest folder
   .pipe(gulp.dest('assets/css'));
});

// Js Task
gulp.task('js', function () {
 // Define a folder to listen - All files witch has .js extension
 return gulp.src('assets/src/js/**/*.js')
   // Concatenate all files in the above directory
   .pipe(concat('script.min.js'))
   // Compress js file into js folder
   .pipe(uglify())
   // Define dest folder
   .pipe(gulp.dest('assets/js'));
});

// Image Task
gulp.task('image', function () {
 // Define a folder to listen - All image files
 return gulp.src('assets/src/img/*')
   // Compress imge files
   .pipe(imagemin([
       imagemin.gifsicle({interlaced: true}),
       imagemin.jpegtran({progressive: true}),
       imagemin.optipng({optimizationLevel: 5}),
       imagemin.svgo({
           plugins: [
               {removeViewBox: true},
               {cleanupIDs: false}
           ]
       })
   ]))
   // Define dest folder
   .pipe(gulp.dest('assets/img'));
});

// HTML Task
gulp.task('htmlmin', function() {
  // Define a folder to listen - All image files
  return gulp.src('_html/*.html')
  // Compress html files
    .pipe(htmlmin({collapseWhitespace: true}))
    // Define dest folder
    .pipe(gulp.dest('.'));
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch('assets/src/sass/**/*.scss', ['sass']);
  gulp.watch('assets/src/js/**/*.js', ['js']);
  gulp.watch('assets/src/img/*', ['image']);
  gulp.watch('_html/*.html', ['htmlmin']);
});

// Serve Task
gulp.task('serve', function () {
  var server = gulpLiveServer.static('./',8000);
  server.start();
  gulp.watch('assets/css/**/*.css', function(file) {
    gulpLiveServer.notify.apply(server, [file]);
  });
  gulp.watch('assets/js/**/*.js', function(file) {
    gulpLiveServer.notify.apply(server, [file]);
  });
  gulp.watch('assets/img/**/*', function(file) {
    gulpLiveServer.notify.apply(server, [file]);
  });
  gulp.watch('./*.html', function(file) {
    gulpLiveServer.notify.apply(server, [file]);
  });
})

// jshint
gulp.task('lint', function() {
    return gulp.src('assets/src/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });
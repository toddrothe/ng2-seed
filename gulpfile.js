var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var semanticWatch = require('./semantic/tasks/watch');
var semanticBuild = require('./semantic/tasks/build');

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('build semantic', semanticBuild);
gulp.task('watch semantic', semanticWatch);

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
  gulp.watch( ['scss/*.scss','*.html', 'app/**/*.js'], ['sass', 'watch semantic'], {cwd: '.'}, reload);
});

gulp.task('fresh build', ['sass','serve', 'build semantic']);

gulp.task('default', ['sass','serve']);

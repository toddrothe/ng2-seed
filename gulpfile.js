var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
  gulp.watch( ['scss/*.scss','*.html', 'app/**/*.js'], ['sass'], {cwd: '.'}, reload);
});

gulp.task('default', ['sass','serve']);

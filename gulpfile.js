'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    tsProject = tsc.createProject('tsconfig.json'),
    browserSync = require('browser-sync'),
    superstatic = require( 'superstatic' ),
    sass = require('gulp-sass'),
    Config = require('./gulpfile.config');

var config = new Config();

/**
 * Lint TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to dist dir.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Delete generated JavaScript files.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
                              config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
                              config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
                              '!' + config.tsOutputPath + '/lib'
                           ];
  // delete the files
  del(typeScriptGenFiles, cb);
});

/*
* Push html files to dist dir
*/
gulp.task('pack-html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('sass-me', function () {
  return gulp
  .src(config.sassInput)
  .pipe(sass())
  .pipe(gulp.dest(config.sassOutput));
});

gulp.task('watch-ts', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
});

gulp.task('watch-sass', function () {
  gulp.watch([config.sassInput], ['sass-me']);
});

gulp.task('serve', ['compile-ts', 'sass-me', 'pack-html','watch-ts', 'watch-sass'], function() {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3002,
    files: ['index.html', '**/*.js', '**/*.html', '**/*.css'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'angularin20typescript',
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: 'dist',
      middleware: superstatic({ debug: false})
    }
  });
});

gulp.task('default', ['clean-ts', 'serve']);

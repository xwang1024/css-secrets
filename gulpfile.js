'use strict';

const gulp        = require('gulp');
const pug         = require('gulp-pug');
const sass        = require('gulp-sass');
const minifyCSS   = require('gulp-csso');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

const config = {
  pugFiles: 'src/views/**/*.pug',
  sassFiles: 'src/sass/**/*.scss'
}

gulp.task('pug', function(){
  return gulp.src(config.pugFiles)
    .pipe(pug())
    .pipe(gulp.dest('build'))
});

gulp.task('sass', function(){
  return gulp.src(config.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
});

gulp.task('pug:watch', function () {
  gulp.watch(config.pugFiles, ['pug']).on("change", reload);;
});

gulp.task('sass:watch', function () {
  gulp.watch(config.sassFiles, ['sass']).on("change", reload);;
});

gulp.task('build', [ 'pug', 'sass' ]);
gulp.task('watch', [ 'pug:watch', 'sass:watch' ]);
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('default', [ 'build', 'watch', 'serve' ]);
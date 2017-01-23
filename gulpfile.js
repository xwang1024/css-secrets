'use strict';

const gulp        = require('gulp');
const pug         = require('gulp-pug');
const sass        = require('gulp-sass');
const minifyCSS   = require('gulp-csso');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

const config = {
  pug: {
    src: 'src/views/**/*.pug',
    watch: ['src/views/**/*.pug', 'src/layout/**/*.pug']
  },
  sass: {
    src: 'src/sass/index.scss',
    watch: 'src/sass/**/*.scss'
  }
}

gulp.task('pug', function(){
  return gulp.src(config.pug.src)
    .pipe(pug())
    .pipe(gulp.dest('public'))
});

gulp.task('sass', function(){
  return gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
});

gulp.task('pug:watch', function () {
  gulp.watch(config.pug.watch, ['pug']).on("change", () => {
    setTimeout(reload, 300);
  });
});

gulp.task('sass:watch', function () {
  gulp.watch(config.sass.watch, ['sass']).on("change", () => {
    setTimeout(reload, 300);
  });
});

gulp.task('build', [ 'pug', 'sass' ]);
gulp.task('watch', [ 'pug:watch', 'sass:watch' ]);
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('default', [ 'build', 'watch', 'serve' ]);
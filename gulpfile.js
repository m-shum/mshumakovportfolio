const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  // run sass css/app.scss -> app.css --watch"
  // get the files we want to watch. Do something with them. Get them to do what we want.
  return gulp
    .src('SRC/styles/app.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('SRC/*.html').pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
  return gulp
    .src('SRC/assets/*')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', function () {
  browserSync.init({
    server: { baseDir: 'dist' },
  });
  gulp.watch('SRC/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('SRC/styles/app.scss', ['sass']);
  gulp.watch('SRC/assets/*', ['assets']);
});

gulp.task('default', ['sass', 'html', 'assets', 'watch']);

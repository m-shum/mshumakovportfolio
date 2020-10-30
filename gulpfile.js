const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cleanCss = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');
const concat = require('gulp-concat');

gulp.task('css', function () {
  // run sass css/app.scss -> app.css --watch"
  // get the files we want to watch. Do something with them. Get them to do what we want.
  return gulp
    .src([
      'SRC/styles/_base.css',
      'SRC/styles/typography.css',
      'SRC/styles/app.css',
    ])
    .pipe(sourceMaps.init())
    .pipe(
      postcss([
        require('autoprefixer'),
        require('postcss-preset-env')({
          stage: 1,
          browsers: ['IE 11', 'last 2 versions'],
        }),
      ])
    )
    .pipe(concat('app.css'))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('SRC/*.html').pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  return gulp.src('SRC/scripts/*.js').pipe(gulp.dest('dist'));
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
  gulp.watch('SRC/styles/*.css', ['css']);
  gulp.watch('SRC/assets/*', ['assets']);
  gulp.watch('SRC/scripts/*.js', ['scripts']);
});

gulp.task('default', ['css', 'html', 'assets', 'scripts', 'watch']);

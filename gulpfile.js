var gulp = require('gulp'),
	sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./src/sass/**', ['sass']);
});

gulp.task( 'default', [ 'sass', 'watch' ] );
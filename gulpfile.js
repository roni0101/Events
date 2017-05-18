
var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync');


// Task watch 

gulp.task('watch', ['browserSync'], function () {
	gulp.watch('./app/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/*', browserSync.reload);
  gulp.watch('app/assets/scripts/*.js', browserSync.reload);

});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})


// Compile everything from scss/main.scss to css/main.css
gulp.task('sass', function () {
  return gulp.src('./app/assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'watch']);
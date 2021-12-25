var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

gulp.task('sass', async ()=>{
  gulp.src('./src/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass','watch'));
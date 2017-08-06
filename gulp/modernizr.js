const
    gulp      = require('gulp'),
    modernizr = require('gulp-modernizr'),
    options   = ['setClasses'];

gulp.task('modernizr', () => gulp
    .src(['./app/css/**/*.css', './app/js/**/*.js'])
    .pipe( modernizr({ options }) )
    .pipe(gulp.dest('./public/scripts'))
)

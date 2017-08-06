var bs    = require('browser-sync').create(),
    gulp  = require('gulp'),
    watch = require('gulp-watch');

gulp.task('default', () => gulp.start('watch'));

gulp.task('cssInject', ['css'], () => gulp
    .src('./app/styles.css')
    .pipe(browserSync.stream())
);

gulp.task('scriptsRefresh', ['scripts'], bs.reload);

gulp.task('distView', () => bs.init({
    notify: false,
    server: {
        baseDir: 'docs'
    }
}));

gulp.task('watch', ['css', 'scripts'], () => {
    bs.init({
        notify: false,
        server: { proxy: 'localhost:3000' }
    });
    watch('./public/css/**/*.css', () => gulp.start('cssInject'));
    watch('./public/js/**/*.js', () => gulp.start('scriptsRefresh'));
    watch('./public/*.html', bs.reload);
});

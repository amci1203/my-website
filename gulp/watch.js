const
    browser = require('browser-sync').create(),
    gulp    = require('gulp'),
    watch   = require('gulp-watch');

gulp.task('default', () => gulp.start('watch'));

gulp.task('cssInject', ['css'], () => gulp
    .src('./public/styles.css')
    .pipe(browser.stream())
);

gulp.task('scriptsRefresh', ['scripts'], browser.reload);

gulp.task('distView', () => browser.init({
    notify: false,
    server: {
        baseDir: 'docs'
    }
}));

gulp.task('watch', ['css', 'scripts'], () => {
    browser.init({
        notify: false,
        port: 8888,
        proxy: 'localhost:3000'
    });
    watch('./app/css/**/*.css', () => gulp.start('cssInject'));
    watch('./app/js/**/*.js', () => gulp.start('scriptsRefresh'));
    watch('./public/**/*.html', browser.reload);
});

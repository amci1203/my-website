const
    gulp   = require('gulp'),
    del    = require('del'),
    usemin = require('gulp-usemin'),
    rev    = require('gulp-rev'),
    nano   = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    bs     = require('browser-sync').create();

gulp.task('build', [
    'cleanDist',
    'useminTrigger',
    'copySoundFile'
]);

gulp.task('cleanDist', () => del(['./docs']))

gulp.task('copySoundFile', ['cleanDist'], function () {
    return gulp.src('./app/smoke-alarm.mp3')
        .pipe(gulp.dest('./docs'))
})

gulp.task('useminTrigger', ['cleanDist'], () => gulp.start('optimizeStaticFiles'))

gulp.task('optimizeStaticFiles', ['css', 'scripts'], () => {
    return gulp.src(['./app/index.html'])
        .pipe(
            usemin({
                css : [rev, nano],
                js  : [rev, uglify]
            })
        )
        .pipe(gulp.dest('./docs'))
})

gulp.task('distView', function () {
    bs.init({
        notify: false,
        server: {
            baseDir: 'docs'
        }
    });
})
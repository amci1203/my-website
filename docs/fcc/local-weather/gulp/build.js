const
    gulp        = require('gulp'),
    del         = require('del'),
    usemin      = require('gulp-usemin'),
    rev         = require('gulp-rev'),
    cssNano     = require('gulp-cssnano'),
    uglify      = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('build', [
    'cleanDist',
    'useminTrigger',
    'copyImages'
]);

gulp.task('cleanDist', () => del(['./docs']))

gulp.task('copyImages', ['cleanDist'], function () {
    return gulp.src('./app/assets/img/*.{png,svg,jpg}')
        .pipe(gulp.dest('./docs/assets/img'))
})

gulp.task('useminTrigger', ['cleanDist'], () => gulp.start('optimizeStaticFiles'))

gulp.task('optimizeStaticFiles', ['css', 'scripts'], () => {
    return gulp.src(['./app/index.html'])
        .pipe(
            usemin({
                css : [rev],
                js  : [rev, uglify]
            })
        )
        .pipe(gulp.dest('./docs'))
})

gulp.task('distView', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'docs'
        }
    });
})

gulp.task('rootView', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './'
        }
    });
})

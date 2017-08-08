const
    gulp   = require('gulp'),
    del    = require('del'),
    rev    = require('gulp-rev'),
    nano   = require('gulp-cssnano'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify');

gulp.task('build', [
    'cleanDist',
    'useminTrigger',
    'copyGeneralFiles'
]);

gulp.task('cleanDist', () => del(['./docs']));

gulp.task('copyGeneralFiles', ['cleanDist'], () => {
    return gulp.src([
        './public/**/*',
        '!./public/*.{html,css}',
        '!./public/scripts/**'
    ])
    .pipe(gulp.dest('./docs'))
});

gulp.task('useminTrigger', ['cleanDist'], () => gulp.start('optimizeStaticFiles'));

gulp.task('optimizeStaticFiles', ['css', 'scripts'], () => {
    return gulp.src(['./public/*.html'])
        .pipe(usemin({
            css : [ rev, nano ],
            js  : [ rev, uglify ]
        }))
        .pipe(gulp.dest('./docs'))
});

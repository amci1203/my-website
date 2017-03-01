var gulp = require('gulp'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssNano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    minimizeIMG = require('gulp-imagemin');

gulp.task('build', [
    'cleanDist',
    'optimizeIMGs',
    'useminTrigger',
    'copyGeneralFiles'
]);

gulp.task('cleanDist', function () {
    return del(['./docs']);
})

gulp.task('copyGeneralFiles', ['cleanDist'], function () {
    return gulp.src([
        './app/**/*',
        '!./app/*.{html,css}',
        '!./app/assets/{js,css,img}/**',
        '!./app/temp',
        '!./app/temp/**',
    ])
    .pipe(gulp.dest('./docs'))
})

gulp.task('optimizeIMGs', ['cleanDist'], function () {
    return gulp.src(['./app/assets/img/**/*', '!./app/assets/img/icons', '!./app/assets/img/symbols', '!./app/assets/img/icons/**/*'])
    .pipe(minimizeIMG({
        pregressive: true,
        interlaced: true,
        multipass: true,
    }))
    .pipe(gulp.dest('./docs/assets/img'))
})

gulp.task('useminTrigger', ['cleanDist'], function () {
    gulp.start('optimizeStaticFiles');
})

gulp.task('optimizeStaticFiles', ['css', 'scripts'], function () {
    return gulp.src(['./app/*.html'])
        .pipe(usemin({
            css: [
                () => { return rev() },
                () => { return cssNano() }
             ],
            js: [
                () => { return rev() },
                () => { return uglify() }
            ]
        }))
        .pipe(gulp.dest('./docs'))
})

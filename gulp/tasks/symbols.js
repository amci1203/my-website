const gulp = require('gulp'),
      gulpif = require('gulp-if'),
      rename = require('gulp-rename'),
      del = require('del'),
      symbols = require('gulp-svg-symbols');
let pathToSymbols = './app/assets/img/symbols',
    pathToIcons = './app/assets/img/icons/**/*.svg'
    config = {
        title: '%f icon'
    };

gulp.task('cleanSymbols', () => {
    return del([pathToSymbols])
})

gulp.task('createSymbols', ['cleanSymbols'], () => {
    return gulp.src([pathToIcons, '!./app/assets/img/icons/**/caret.svg'])
    .pipe(symbols(config))
    .pipe(gulp.dest(pathToSymbols))
})

gulp.task('copySymbolCSS', ['createSymbols'], () => {
    return gulp.src(pathToSymbols + '/**/*.css')
    .pipe(rename((file) => { file.basename = '_symbols' }))
    .pipe(gulp.dest('./app/assets/css/modules'))
})

gulp.task('copySymbolSVG', ['createSymbols'], () => {
    return gulp.src(pathToSymbols + '/**/*.svg')
    .pipe(rename((file) => { file.basename = 'symbols' }))
    .pipe(gulp.dest('./app/assets/img'))
})

gulp.task('svgSymbols', ['cleanSymbols', 'createSymbols', 'copySymbolCSS', 'copySymbolSVG'], () => { gulp.start('cleanSymbols') })

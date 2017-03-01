var gulp = require('gulp'),
    postCSS = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    nesting = require('postcss-nested'),
    mixins = require('postcss-mixins'),
    math = require('postcss-calc'),
    hexRGB = require('postcss-hexrgba'),
    colorMath = require('postcss-color-function'),
    postImport = require('postcss-import'),
    utilities = require('postcss-utilities'),
    cssVars = require('postcss-simple-vars');

gulp.task('css', function () {
    console.log('---> Filtering CSS file...');
    return gulp.src('./app/assets/css/styles.css')
        .pipe(postCSS([
            postImport,
            utilities,
            cssVars,
            mixins,
            nesting,
            math,
            colorMath,
            hexRGB,
            autoprefixer
        ]))
        .on('error', function (err) {
            console.log('There seems to be an error with your CSS.');
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app'));
})

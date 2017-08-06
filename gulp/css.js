const
    gulp = require('gulp'),
    css  = require('gulp-postcss'),

    plugins = [ 'precss', 'postcss-calc', 'autoprefixer' ].map(plugin => require(plugin));

gulp.task('css', () => {
    console.log('---> Filtering CSS file...');
    return gulp.src('./app/css/styles.css')
        .pipe(css(plugins))
        .on('error', err => {
            console.log('There seems to be an error with your CSS.');
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./public'));
})

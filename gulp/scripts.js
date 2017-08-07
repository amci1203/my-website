const gulp    = require('gulp'),
      webpack = require('webpack');

gulp.task('scripts', ['modernizr'], () => {
    webpack(require('../webpack.config.js'), (err, stats) => {
        if (err) console.log(err.toString());
        console.log('Script Packing Done...\n\n' + stats.toString());
    })
})


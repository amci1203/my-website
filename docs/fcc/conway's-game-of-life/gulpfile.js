const
    gulp     = require('gulp'),
    watch    = require('gulp-watch'),
    webpack  = require('webpack')
    css      = require('gulp-postcss'),
    bs       = require('browser-sync').create(),
    fallback = require('connect-history-api-fallback'),
    log      = require('connect-logger'),

    del         = require('del'),
    usemin      = require('gulp-usemin'),
    rev         = require('gulp-rev'),
    nano        = require('gulp-cssnano'),
    uglify      = require('gulp-uglify');

const plugins = ['precss', 'postcss-calc', 'autoprefixer'].map(p => require(p));

gulp.task('transpileJs', () => {
    webpack(require('./webpack.config.js'), (err, stats) => {
        console.log(err ? err.toString() : `Script Packing Done...\n${stats.toString()}`);
    })
})

gulp.task('refreshJs', ['transpileJs'], bs.reload)

gulp.task('postCSS', () => {
    return gulp.src('./app/assets/styles.css')
        .pipe(css(plugins))
        .on('error', function (err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app'))
})

gulp.task('injectCSS', ['postCSS'], () => {
    return gulp.src('./app/styles.css')
        .pipe(bs.stream());
});

gulp.task('default', ['transpileJs', 'postCSS'], () => {
    bs.init({
        notify: false,
        files: ['./**/*.{html,htm,js}'],
        watchOptions: { ignored: 'node_modules' },
        server: {
            baseDir: './app',
            middleware: [
                log({ format: '%date %status %method %url' }),
                fallback({
                    index: '/index.html',
                    // systemjs workaround
                    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
                })
            ]
        }
    })

    watch('./app/assets/styles.css', () => gulp.start('injectCSS'))
    watch('./app/assets/app.jsx', () => gulp.start('transpileJs'))
})

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

gulp.task('optimizeStaticFiles', ['postCSS', 'transpileJs'], () => {
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
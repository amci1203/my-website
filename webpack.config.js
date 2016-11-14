module.exports = {
    entry: {
        app: './app/assets/js/app.js',
        vendor: './app/assets/js/vendor.js',
        resume: './app/assets/js/resume.js'
    },
    output: {
        path: './app/temp/scripts',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}

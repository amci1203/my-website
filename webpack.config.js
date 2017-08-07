module.exports = {
    entry: {
        app: './app/js/app.js',
        fcc: './app/js/fcc.js',

        vendor: './app/js/vendor.js',
    },
    output: {
        path: './public/scripts',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                query: {
                    presets: ['es2015', 'es2016'],
                    plugins: ['lodash']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}

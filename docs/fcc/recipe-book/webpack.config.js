const path = require('path');

module.exports = {
    entry: './app/assets/app.jsx',
    output: {
        path: path.resolve('app'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/entry.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watch: true,
    module: {
        loaders: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    devtool: 'source-maps',
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
};
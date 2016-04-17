var webpack = require("webpack");
var path = require("path");
require('core-js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ["./src/main.js", "./scss/app.scss"],
    },
    resolve: {
        modulesDirectories: ["node_modules", "src", "scss"],
        extensions: ["", ".js", ".scss"],
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: "bundle.js",
        sourceMapFilename: "[file].map"
    },
    devServer: {
      contentBase: ".",
      inline: true,
      watch: true,
      hot: true
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /.scss?$/,
            loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true')
        }]
    },
    plugins: [ new webpack.HotModuleReplacementPlugin(), new ExtractTextPlugin('styles.css')]
};
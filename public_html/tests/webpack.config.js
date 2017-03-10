const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require("glob");

const commonPackages = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    tether: 'tether',
    Tether: 'tether',
    'window.Tether': 'tether',
    '_': 'underscore',
    'Backbone': 'backbone',
})


const config = {
    entry: glob.sync("./js/**/*.js"),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                })
            },
        ],
    },
    plugins:
            [
                new ExtractTextPlugin('styles.css'),
                new CleanWebpackPlugin(['build'], {
                }),
                commonPackages,
            ]


}

module.exports = config;
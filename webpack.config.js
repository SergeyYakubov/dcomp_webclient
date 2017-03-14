const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const debug = process.env.NODE_ENV !== 'production';
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
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: debug ? 'bundle.js' : '[chunkhash].[name].js'
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
            debug ? {} : {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
        ],
    },
    plugins: debug ?
            [
                new ExtractTextPlugin('styles.css'),
                new CleanWebpackPlugin(['build'], {
                    //            root: '/full/project/path',
                }),
                commonPackages,
                new HtmlWebpackPlugin({
                    filename: '../index.html',
                    template: 'templates/index.ejs',
                }),
                new InlineManifestWebpackPlugin({
                    name: 'webpackManifest'
                }),
            ] :
            [
                new ExtractTextPlugin('[chunkhash].[name].css'),
                new CleanWebpackPlugin(['build'], {
                    //            root: '/full/project/path',
                }),
                commonPackages,
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    minChunks: function (module) {
                        return module.context && module.context.indexOf('node_modules') !== -1;
                    }
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    names: ['vendor', 'manifest']
                }),
                new HtmlWebpackPlugin({
                    filename: '../index.html',
                    template: 'templates/index.ejs',
                }),
                new InlineManifestWebpackPlugin({
                    name: 'webpackManifest'
                }),
                new webpack.optimize.UglifyJsPlugin({
                    minimize: true,
                    compress: {
                        warnings: false
                    }
                }),
            ]

}


//const configTests = {
//    entry: glob.sync("./tests/js/**/*.js"),
/*    output: {
        path: path.resolve(__dirname, 'tests/build'),
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
                new CleanWebpackPlugin(['tests/build'], {
                }),
                commonPackages,
            ]


}


module.exports = [config,configTests];
*/

module.exports = config;
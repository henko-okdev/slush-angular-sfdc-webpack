//after-compile(c: Compilation)
var webpack = require('webpack');
var path = require('path');

var resourceFolderPath = '../../resource-bundles/ExampleApplication.resource/';
module.exports = {

    context: __dirname + '/app',
    entry: './index.js',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },

    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',

    output: {
        path: resourceFolderPath,
        filename: 'bundle.js'
    },

    plugins:[],

    module:{
        preLoaders: [],
        loaders:[
            {
                test: /\.less$/,
                loader: "style!css!less?strictMath&noIeCompat"
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }
        ]
    }

};

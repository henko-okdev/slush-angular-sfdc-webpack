const webpack = require('webpack');
const path = require('path');
const wres = require.resolve;

const WebpackSfdcDeployPlugin = require('webpack-sfdc-deploy-plugin');

const IS_DEPLOY = process.env.POST_BUILD === 'deploy';

const outputPath = '../../../resource-bundles/AwesomeApp.resource/';

const config = {
    context: path.resolve(__dirname, 'app'),
    entry: {
        app: './app.module.js',
        vendor: [ 'angular', 'angular-ui-router' ]
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },

    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',
    output: {
        path: outputPath,
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            ON_TEST: (process.env.NODE_ENV === 'test'),
            IS_LOCAL: (process.env.NODE_ENV === 'local'),

            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        })
    ],

    // Used 'require.resolve' aka 'wres' function
    // to apply loaders to components/services from
    // global scope folders: package/components|services|etc.
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: wres('ng-annotate-loader') + '?add=true'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: wres('babel-loader'),
                query: {
                    presets: [
                        wres('babel-preset-es2015'),
                        wres('babel-preset-stage-0')
                    ]
                }
            },
            {
                test: /\.(less|css)/,
                exclude: /node_modules/,
                loader: wres('style-loader') + '!' +
                        wres('css-loader') + '!' +
                        wres('less-loader') + '?strictMath&noIeCompat'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: wres('raw-loader')
            }
        ]
    }
};

// Add plugin to deploy package to Salesforce.
// Comment `include` option to deploy all files generated by webpack,
// for example .js.map files to debug application in the best practice way
if (IS_DEPLOY) {
    config.plugins.push(new WebpackSfdcDeployPlugin({
        credentialsPath: path.join(__dirname, '../../config/jsforce.config.js'),
        filesFolderPath: path.join(__dirname, outputPath),
        staticResourceName: 'AwesomeApp',
        include: [/\.js$/]
    }));
}

module.exports = config;

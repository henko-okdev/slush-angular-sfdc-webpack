//after-compile(c: Compilation)
var config = require('./webpack.config.js');

var WebpackSfdcDeployPlugin = require('webpack-sfdc-deploy-plugin');

var resourceFolderPath = '../../../resource-bundles/ExampleApplication.resource/';
console.log(__dirname + '/../../config/jsforce.config.js');
config.plugins.push(
    new WebpackSfdcDeployPlugin({
        credentialsPath: __dirname + '/../../config/jsforce.config.js',
        filesFolderPath: __dirname + '/' + resourceFolderPath,
        staticResourceName: 'ExampleApplication'
    })
);

module.exports = config;
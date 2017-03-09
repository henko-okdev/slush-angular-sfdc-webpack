//after-compile(c: Compilation)
var path = require('path');
var config = require('./webpack.config.js');

var WebpackSfdcDeployPlugin = require('webpack-sfdc-deploy-plugin');

config.plugins.push(
    new WebpackSfdcDeployPlugin({
        credentialsPath: path.join(__dirname, '../..', 'config/jsforce.config.js'),
        filesFolderPath: path.join(__dirname, config.output.path),
        staticResourceName: '<%= appNameCamel %>'
    })
);

module.exports = config;
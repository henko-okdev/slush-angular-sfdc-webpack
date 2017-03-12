/*
 * slush-angular-sfdc-webpack
 * https://github.com/henko-okdev/slush-angular-sfdc-webpack
 *
 * Copyright (c) 2017, Ruslan Kurchenko
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    spawn = require('cross-spawn'),
    template = require('gulp-template'),
    filter = require('gulp-filter'),
    fn = require('gulp-fn'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path'),
    btoa = require('btoa'),
    jsForce = require('jsforce');

function loadCredentials() {
    console.log(process.cwd());
    var credentials,
        credentialsPath = process.cwd() + '/../config/jsforce.config.js';

    try {
        credentials = require(credentialsPath);
    } catch (e) {
        console.log('Credentials didn\'t found by the path - ' + credentialsPath + '.\n' +
            'The task will prompt to enter it manually.');
    }

    return credentials;
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
        credentials = loadCredentials(),
        isCredentialsExists = false;

    if(credentials) {
        isCredentialsExists = true;
    }

    return {
        appName: workingDirName,
        credentials: credentials,
        isCredentialsExists: isCredentialsExists
    };
})();

module.exports = function (gulp) {

    gulp.task('app', function (done) {
        var prompts = [{
            name: 'appName',
            message: 'What is the name of your Application/Visualforce page?',
            default: defaults.appName
        }, {
            when: function () {
                return !defaults.isCredentialsExists;
            },
            name: 'username',
            message: 'Enter your Salesforce org username.'
        }, {
            when: function () {
                return !defaults.isCredentialsExists;
            },
            name: 'password',
            message: 'Enter your Salesforce org password.'
        }, {
            when: function () {
                return !defaults.isCredentialsExists;
            },
            name: 'token',
            message: 'Enter your Salesforce org token.'
        }];

        inquirer.prompt(prompts,
            function (answers) {

                // TODO: ask for angular app name style
                // Format Application name in Salesforce and AngularJS way
                answers.appNameSlug = _.slugify(answers.appName);
                answers.appNameCamel = _.camelize(answers.appName);

                // Load credentials from answers is not exists
                if(!defaults.isCredentialsExists) {
                    defaults.credentials = {
                        username: answers.username,
                        password: answers.password,
                        token: answers.token
                    };
                }

                var abstractAppName = 'app-name-to-replace';
                var abstractVfPageName = 'app-vf-template.page';
                var visualforcePageContent;
                gulp.src(__dirname + '/../templates/app/**')
                    .pipe(template(answers))
                    .pipe(fn(function(file) {
                        if(path.basename(file.path) === abstractVfPageName) {
                            visualforcePageContent = btoa(file._contents.toString());
                        }
                    }))
                    .pipe(rename(function (file) {
                        if(file.basename === abstractAppName) {
                            file.basename = answers.appNameCamel;
                        }

                        file.dirname = file.dirname.replace(abstractAppName, answers.appNameCamel);

                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(filter(['**', '!**/**.page']))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .on('end', function () {
                        var cwd = path.resolve(process.cwd(), answers.appNameCamel);
                        spawn.sync('npm', ['install'], { stdio: 'inherit', cwd: cwd});
                        spawn.sync('npm', ['run', 'build:deploy'], {stdio: 'inherit', cwd: cwd});

                        createVisualforcePage(defaults.credentials, answers.appNameCamel, visualforcePageContent, done);
                    });
            });
    });

    function createVisualforcePage(credentials, name, content, callback) {
        const conn = new jsForce.Connection();
        conn.login(credentials.username, credentials.password + defaults.credentials.token, (err, res) => {
                var metadata = [{
                    fullName: name,
                    label: name,
                    content: content,
                    description: name,
                    apiVersion: 39
                }];

                conn.metadata.create('ApexPage', metadata, (err, results) => {
                    if (results && results.success === true) {
                        console.log('======================================================');
                        console.log('The Apex Page: "' + name + '" was successfully created!');
                        console.log('======================================================');
                    } else {
                        console.log(results);
                    }

                    callback();
                });
            });
    }

};



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
    template = require('gulp-template'),
    fn = require('gulp-fn'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

module.exports = function (gulp) {

    gulp.task('service', function (done) {
        var prompts = [{
            name: 'serviceName',
            message: 'What is the name for a new service?'
        }, {
            name: 'continue',
            type: 'confirm',
            message: 'Continue?'
        }];

        inquirer.prompt(prompts,
            function (answers) {
                if(!answers.continue) {
                    done();
                }

                // Format answers in Salesforce and AngularJS way
                answers.serviceNameSlug = _.slugify(answers.serviceName);
                answers.serviceNameCamel = _.camelize(answers.serviceName);
                answers.serviceNameClassed = _.capitalize(answers.serviceNameCamel);

                var abstractName = 'name-to-replace';
                gulp.src(__dirname + '/../templates/service/**')
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if(_.include(file.basename, abstractName)) {
                            file.basename = file.basename.replace(abstractName, answers.serviceNameSlug);
                        }

                        file.dirname = file.dirname.replace(abstractName, answers.serviceNameSlug);

                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .on('end', function () {
                        done();
                    });
            });
    });

};



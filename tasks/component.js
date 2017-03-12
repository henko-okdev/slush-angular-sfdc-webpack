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
    filter = require('gulp-filter'),
    template = require('gulp-template'),
    fn = require('gulp-fn'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

module.exports = function (gulp) {

    gulp.task('component', function (done) {
        var prompts = [{
            name: 'isSeparateModule',
            type: 'confirm',
            message: 'Do you want to create a separated module for a new component?'
        }, {
            when: function(answers) {
                return answers.isSeparateModule;
            },
            name: 'moduleName',
            message: 'What is the name of the module?',
            defaults: 'app'
        }, {
            name: 'componentName',
            message: 'What is the name for a new component?'
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
                answers.componentNameSlug = _.slugify(answers.componentName);
                answers.componentNameCamel = _.camelize(answers.componentName);
                answers.componentNameClassed = _.capitalize(answers.componentNameCamel);

                answers.moduleNameClassed = answers.isSeparateModule ? _.capitalize(answers.moduleName.replace('.', '')) : '';

                var filterPaths = ['**'];
                if(!answers.isSeparateModule) {
                    filterPaths.push('!**/templates/component/**/index.js');
                }

                var abstractName = 'name-to-replace';
                gulp.src(__dirname + '/../templates/component/**')
                    .pipe(filter(filterPaths))
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if(_.include(file.basename, abstractName)) {
                            file.basename = file.basename.replace(abstractName, answers.componentNameSlug);
                        }

                        file.dirname = file.dirname.replace(abstractName, answers.componentNameSlug);

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



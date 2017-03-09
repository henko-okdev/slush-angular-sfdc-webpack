/*
 * slush-angular-sfdc-webpack
 * https://github.com/henko-okdev/slush-angular-sfdc-webpack
 *
 * Copyright (c) 2017, Ruslan Kurchenko
 * Licensed under the MIT license.
 */

'use strict';

var install = require('gulp-install'),
    filter = require('gulp-filter'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

module.exports = function (gulp) {

    gulp.task('package', function (done) {
        var prompts = [{
            name: 'createExample',
            type: 'confirm',
            message: 'Is it necessary to create ExampleApplication?',
            default: true
        }, {
            name: 'moveon',
            type: 'confirm',
            message: 'Continue?'
        }];

        inquirer.prompt(prompts,
            function (answers) {

                if(!answers.moveon) {
                    done();
                }

                // TODO: ask for angular app name style
                // Format Application name in Salesforce and AngularJS way
                answers.appNameSlug = _.slugify(answers.appName);
                answers.appNameCamel = _.camelize(answers.appName);

                var filterPaths = ['**'];
                if(!answers.createExample) {
                    filterPaths.push('!**/templates/package/package/apps/**');
                    filterPaths.push('!**/templates/package/package/components/**');
                    filterPaths.push('!**/templates/package/package/services/**');
                }
                var filterInstance = filter(filterPaths);

                gulp.src(__dirname + '/../templates/package/**')
                    .pipe(filterInstance)
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .pipe(install())
                    .on('end', function () {
                        done();
                    });
            });
    });

};



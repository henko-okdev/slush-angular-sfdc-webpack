/*
 * slush-angular-sfdc-webpack
 * https://github.com/henko-okdev/slush-angular-sfdc-webpack
 *
 * Copyright (c) 2017, Ruslan Kurchenko
 * Licensed under the MIT license.
 */

(function() {
    'use strict';
    var gulp = require('gulp');

    var includeAll = require('include-all');

    /**
     * Loads task modules from a relative path.
     */
    function loadTasks(relPath) {
        return includeAll({
                dirname: require('path').resolve(__dirname, relPath),
                filter: /(.+)\.js$/
            }) || {};
    }

    /**
     * Invokes the function from a Gulp configuration
     * module with a single argument - the `gulp` object.
     */
    function addTasks(tasks) {
        for (var taskName in tasks) {
            if (tasks.hasOwnProperty(taskName)) {
                tasks[taskName](gulp);
            }
        }
    }

    /**
     * Add all Gulp tasks to the gulpfile.
     * Tasks are in `tasks/`
     */
    addTasks(loadTasks('tasks/'));

    /**
     * Set 'app' as default task for generator
     */
    gulp.task('default', ['app']);

})();

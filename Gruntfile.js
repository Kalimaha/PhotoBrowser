/*
 * grunt-exif-to-photobrowser
 * https://github.com/Kalimaha/grunt-exif-to-photobrowser
 *
 * Copyright (c) 2016 Guido Barbaglia
 * Licensed under the MIT license.
 */
(function () {

    'use strict';

    /*global module*/
    module.exports = function (grunt) {

        /* Project configuration. */
        grunt.initConfig({

            jshint: {
                all: [
                    'Gruntfile.js',
                    'src/js/*.js',
                    'src/js/tasks/*.js',
                    '<%= nodeunit.tests %>'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            },

              /* Before generating any new files, remove any previously-created files. */
            clean: {
                tests: ['tmp']
            },

            /* Unit tests. */
            nodeunit: {
                tests: ['test/*_test.js']
            }

        });

        /* Actually load this plugin's task(s). */
        grunt.loadTasks('src/js/tasks');

        /* These plugins provide necessary tasks. */
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-nodeunit');

        /* Run tests. */
        grunt.registerTask('test', ['nodeunit']);

        /* By default, lint and run all tests. */
        grunt.registerTask('default', ['jshint', 'test']);

    };

}());
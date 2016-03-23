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

        /* Plugin entry point. */
        grunt.registerMultiTask('exif_to_photobrowser', function () {

            /* Read options from command line. */
            var input_file = grunt.option('input_file'),
                output_folder = grunt.option('output_folder');

            /* Check whether parameters have been passed. */
            if (input_file === undefined) {
                throw new Error('Please provide the input file, e.g. --input_file=/tmp/works.xml');
            }
            if (output_folder === undefined) {
                throw new Error('Please provide the output folder, e.g. --output_folder=/tmp');
            }

            /* Make the options global. */
            grunt.option('input_file', input_file);
            grunt.option('output_folder', output_folder);

            //var lib = require('../exif_to_photobrowser.js');
            //var test = lib.xml2string('resources/xml/works.xml');
            //console.log(test);


        });

    };

    //exports.test = function (string) {
    //    string = string.match(/[a-z0-9]/gi).join('').toLowerCase();
    //    return string === string.split('').reverse().join('');
    //};

    //exports.pippo = function () {
    //    return 'Hallo';
    //};

}());
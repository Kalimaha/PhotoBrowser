/*
 * grunt-exif-to-photobrowser
 * https://github.com/Kalimaha/grunt-exif-to-photobrowser
 *
 * Copyright (c) 2016 Guido Barbaglia
 * Licensed under the MIT license.
 */
/*global require, console*/
(function () {

    'use strict';

    /*global module*/
    module.exports = function (grunt) {

        /* Plugin entry point. */
        grunt.registerMultiTask('exif_to_photobrowser', function () {

            /* Declare variables. */
            var input_file,
                output_folder,
                lib = require('../exif_to_photobrowser.js'),
                path = require('path'),
                xml_string,
                json,
                array,
                archive,
                makers,
                models,
                i,
                j;

            /* Read options from command line. */
            input_file = grunt.option('input_file');
            output_folder = grunt.option('output_folder');

            /* Check whether parameters have been passed. */
            if (input_file === undefined) {
                throw new Error('Please provide the input file, e.g. --input_file=/tmp/works.xml');
            }
            if (output_folder === undefined) {
                throw new Error('Please provide the output folder, e.g. --output_folder=/tmp');
            }

            /* Convert input file in an array of objects. */
            console.log('Store the content of the file into an XML string...');
            xml_string = lib.xml2string(input_file);
            console.log('Convert the XML string to a JSON object...');
            json = lib.string2json(xml_string);
            console.log('Create an array of works...');
            array = lib.json2array(json);

            /* Re-organize the original content in a tree. */
            console.log('Re-organize the original content in a tree...');
            archive = lib.array2archive(array);

            /* Create the index page. */
            console.log('Create HTML for the index page...');
            lib.create_index_page(archive, output_folder);

            /* Create an HTML page for each maker. */
            makers = lib.get_makers(archive);
            for (i = 0; i < makers.length; i += 1) {

                console.log('\tGenerate HTML for: ' + makers[i].name);
                lib.create_maker_pages(archive, output_folder, makers[i].name);

                /* Create an HTML page for each model. */
                models = lib.get_models(archive, makers[i].name);
                for (j = 0; j < models.length; j += 1) {
                    console.log('\t\tGenerate HTML for: ' + models[j].name);
                    lib.create_model_pages(archive, output_folder, makers[i].name, models[j].name);
                }

            }

            /* Final message. */
            console.log('DONE. You can browse the works at: ' + path.join(output_folder, 'index.html'));

        });

    };

}());
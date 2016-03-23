/*
 * grunt-exif-to-photobrowser
 * https://github.com/Kalimaha/grunt-exif-to-photobrowser
 *
 * Copyright (c) 2016 Guido Barbaglia
 * Licensed under the MIT license.
 */
/*global exports, require*/
'use strict';

/**
 * Read an XML file and convert it into a string.
 * @param filepath The absolute path to the file.
 * @returns {*} The string of the content.
 */
exports.xml2string = function (filepath) {
    var fs = require('fs'),
        file;
    if (filepath.indexOf('.xml') < 0) {
        throw new Error('Please provide a file with the XML extension.');
    }
    try {
        file = fs.readFileSync(filepath, 'utf8');
    } catch (e) {
        throw new Error('No such file or directory.');
    }
    return file;
};

/**
 * Convert an XML string into a JSON object.
 * @param xml_string The XML string.
 * @returns {*} A JSON representation of the original string.
 */
exports.string2json = function (xml_string) {
    var parser = require('xml2json');
    return parser.toJson(xml_string, {
        object: true,
        arrayNotation: true
    });
};

/**
 * The format returned by the xml2json plug-in is not suitable for further
 * manipulation. This function create an array of work objects.
 * @param json The JSON object produced by the xml2json plug-in.
 * @returns {*} An array of objects.
 */
exports.json2array = function (json) {
    var works = [],
        i;
    for (i = 0; i < json.works[0].work.length; i += 1) {
        works.push(json.works[0].work[i]);
    }
    return works;
};

/**
 * Create a file in the given directory with the given content.
 * @param file_content The content of the file.
 * @param output_directory The output directory.
 * @param output_name The name of the output file.
 */
exports.create_html_file = function (file_content, output_directory, output_name) {
    var fs = require('fs'),
        path = require('path');
    if (!fs.lstatSync(output_directory).isDirectory()) {
        throw new Error(output_directory + ' is not a directory.');
    }
    try {
        fs.writeFile(path.join(output_directory, output_name), file_content, function (err) {
            if (err) {
                throw new Error(err);
            }
        });
    } catch (e) {
        throw new Error('Error while writing the file');
    }
};

/**
 * Organize the original file in a tree where each leaf is a make. Each make then
 * has the various models, and each model holds the URLs of the pictures.
 * @param array The array produced out of the XML file.
 * @returns {{}}
 */
exports.array2archive = function (array) {
    var archive = {
            tree: {},
            works: []
        },
        i,
        make,
        model,
        url;
    for (i = 0; i < array.length; i += 1) {
        make = array[i].exif[0].make !== undefined ? array[i].exif[0].make[0] : undefined;
        model = array[i].exif[0].model !== undefined ? array[i].exif[0].model[0] : undefined;
        url = array[i].urls[0].url[2].$t;
        if (make !== undefined && archive.tree[make] === undefined) {
            archive.tree[make] = {};
        }
        if (model !== undefined && archive.tree[make][model] === undefined) {
            archive.tree[make][model] = [];
        }
        try {
            archive.tree[make][model].push(url);
            archive.works.push(url);
        } catch (ignore) {

        }
    }
    return archive;
};

exports.get_makes = function (archive) {
    return Object.keys(archive.tree);
};
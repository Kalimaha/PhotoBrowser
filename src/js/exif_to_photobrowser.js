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
 * Organize the original file in a tree where each leaf is a maker. Each maker then
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
        maker,
        model,
        url;
    for (i = 0; i < array.length; i += 1) {
        maker = array[i].exif[0].make !== undefined ? array[i].exif[0].make[0] : undefined;
        model = array[i].exif[0].model !== undefined ? array[i].exif[0].model[0] : undefined;
        url = array[i].urls[0].url[2].$t;
        archive.works.push(url);
        if (maker !== undefined && archive.tree[maker.toUpperCase()] === undefined) {
            archive.tree[maker.toUpperCase()] = {};
        }
        if (model !== undefined && archive.tree[maker.toUpperCase()][model.toUpperCase()] === undefined) {
            archive.tree[maker.toUpperCase()][model.toUpperCase()] = [];
        }
        try {
            archive.tree[maker.toUpperCase()][model.toUpperCase()].push(url);
        } catch (ignore) {

        }
    }
    return archive;
};

/**
 * Extract all the makers from the archive.
 * @param archive The object storing makers, models and works.
 * @returns {Array} An array of maker objects.
 */
exports.get_makers = function (archive) {
    var makers = [],
        i,
        maker;
    for (i = 0; i < Object.keys(archive.tree).length; i += 1) {
        maker = Object.keys(archive.tree)[i];
        makers.push({
            name: maker.toUpperCase(),
            id: this.create_maker_id(maker)
        });
    }
    makers.sort(function (a, b) {
        return a.name > b.name;
    });
    return makers;
};

/**
 * Get all the models for a given maker.
 * @param archive archive The object storing makers, models and works.
 * @param maker The name of the maker.
 * @returns {Array} An array of model objects.
 */
exports.get_models = function (archive, maker) {
    var models = [],
        i,
        model;
    for (i = 0; i < Object.keys(archive.tree[maker]).length; i += 1) {
        model = Object.keys(archive.tree[maker])[i];
        models.push({
            name: model.toUpperCase(),
            id: model.replace(/\s+/g, '').toUpperCase()
        });
    }
    models.sort(function (a, b) {
        return a.name > b.name;
    });
    return models;
};

exports.get_works = function (archive, maker, model) {
    var works = [],
        i;
    for (i = 0; i < archive.tree[maker][model].length; i += 1) {
        works.push(archive.tree[maker][model][i]);
    }
    return works;
};

/**
 * Load the index template and fill it with makes and works.
 * @param archive The object storing makes, models and works.
 * @param output_folder The folder where the new file will be stored.
 */
exports.create_index_page = function (archive, output_folder) {
    var handlebars = require('handlebars'),
        fs = require('fs'),
        data = {
            title: 'Photo Browser - Index',
            makers: this.get_makers(archive),
            urls: archive.works.splice(0, 10)
        },
        template,
        html,
        that = this;
    fs.readFile('src/html/index.hbs', 'utf-8', function (error, source) {
        if (error) {
            throw new Error(error);
        }
        template = handlebars.compile(source);
        html = template(data);
        that.create_html_file(html, output_folder, 'index.html');
    });
};

/**
 * Create one html page for each maker.
 * @param archive The object storing makes, models and works.
 * @param output_folder The folder where the new file will be stored.
 * @param maker The name of the maker.
 */
exports.create_maker_pages = function (archive, output_folder, maker) {
    var handlebars = require('handlebars'),
        fs = require('fs'),
        data,
        template,
        html,
        that = this,
        j,
        source,
        models = that.get_models(archive, maker.toUpperCase()),
        urls = [],
        filename;
    for (j = 0; j < models.length; j += 1) {
        urls.push.apply(urls, archive.tree[maker.toUpperCase()][models[j].name]);
    }
    source = fs.readFileSync('src/html/maker.hbs', 'utf-8');
    data = {
        title: 'Photo Browser - ' + maker,
        models: models,
        urls: urls
    };
    template = handlebars.compile(source);
    html = template(data);
    filename = this.create_maker_id(maker) + '.html';
    that.create_html_file(html, output_folder, filename);
};

/**
 * Create a html page for each model.
 * @param archive The object storing makes, models and works.
 * @param output_folder The folder where the new file will be stored.
 * @param maker
 * @param model
 */
exports.create_model_pages = function (archive, output_folder, maker, model) {
    var handlebars = require('handlebars'),
        fs = require('fs'),
        data,
        template,
        html,
        that = this,
        source = fs.readFileSync('src/html/model.hbs', 'utf-8'),
        urls = archive.tree[maker.toUpperCase()][model.toUpperCase()],
        filename;
    data = {
        title: 'Photo Browser - ' + model,
        urls: urls,
        maker_name: maker,
        maker_id: this.create_maker_id(maker)
    };
    template = handlebars.compile(source);
    html = template(data);
    filename = model.replace(/\s+/g, '').toUpperCase() + '.html';
    that.create_html_file(html, output_folder, filename);
};

/**
 * Create and ID from the maker name.
 * @param maker Maker's name
 * @returns {string} The maker ID
 */
exports.create_maker_id = function (maker) {
    return maker.split(' ')[0].toUpperCase();
};
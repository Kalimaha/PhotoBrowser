/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.get_models_test = {

        'Get all models of the given camera maker.': function (test) {
            test.expect(5);
            var xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string),
                array = lib.json2array(json),
                archive = lib.array2archive(array),
                models = lib.get_models(archive, 'CANON');
            test.equal(typeof models, 'object');
            test.equal(models.constructor, Array);
            test.equal(models.length, 2);
            test.equal(models[0].name !== undefined, true);
            test.equal(models[0].id !== undefined, true);
            test.done();
        }

    };

}());

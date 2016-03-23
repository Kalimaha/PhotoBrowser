/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.string_to_object = {

        'Convert a JSON object into an array.': function (test) {
            test.expect(3);
            var xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string);
            test.equal(typeof lib.json2array(json), 'object');
            test.equal(lib.json2array(json).constructor, Array);
            test.equal(lib.json2array(json).length, 14);
            test.done();
        }

    };

}());

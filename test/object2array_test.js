/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.string_to_object = {

        'Convert a JSON object into an array.': function (test) {
            test.expect(3);
            var xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string),
                array = lib.json2array(json);
            test.equal(typeof array, 'object');
            test.equal(array.constructor, Array);
            test.equal(array.length, 14);
            test.done();
        }

    };

}());

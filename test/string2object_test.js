/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.string_to_object = {

        'Convert an XML string into a JSON object.': function (test) {
            test.expect(1);
            var xml_string = lib.xml2string('resources/xml/works.xml');
            test.equal(typeof lib.string2json(xml_string), 'object');
            test.done();
        }

    };

}());

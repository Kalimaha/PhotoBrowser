/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.xml_to_string = {

        'Load an XML file and converts it into a string.': function (test) {
            test.expect(1);
            test.equal(typeof lib.xml2string('resources/xml/works.xml'), 'string');
            test.done();
        },

        'Throws error when the file does not exist.': function (test) {
            test.expect(1);
            test.throws(function () {lib.xml2string('resources/xml/works2.xml'); });
            test.done();
        },

        'Throws error when the file does not have the XML extension.': function (test) {
            test.expect(1);
            test.throws(function () {lib.xml2string('resources/xml/works.txt'); });
            test.done();
        }

    };

}());

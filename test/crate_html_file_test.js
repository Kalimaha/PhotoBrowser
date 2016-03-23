/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.xml_to_string = {

        'Create a file at the given position with the given content.': function (test) {
            test.expect(0);
            lib.create_html_file('MyFile', '/tmp/', 'test.txt');
            //test.equal(typeof lib.xml2string('resources/xml/works.xml'), 'string');
            test.done();
        },

        'Throws error when the directory does not exists.': function (test) {
            test.expect(1);
            test.throws(function () {lib.create_html_file('MyFile', '/tmp2/', 'test.txt'); });
            test.done();
        }

    };

}());

/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.xml_to_string = {

        'Create a file at the given position with the given content.': function (test) {
            var fs = require('fs');
            try {
                test.expect(1);
                lib.create_html_file('MyFile', '/tmp/', 'test.txt');
                test.equal(fs.lstatSync('/tmp/test.txt').isFile(), true);
                test.done();
            } catch (e) {
                test.done();
            }
        },

        'Throws error when the directory does not exists.': function (test) {
            test.expect(1);
            test.throws(function () {lib.create_html_file('MyFile', '/tmp2/', 'test.txt'); });
            test.done();
        }

    };

}());

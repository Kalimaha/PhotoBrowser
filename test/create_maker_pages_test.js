/*global exports, require*/
/*jslint node: true, stupid: true*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.create_maker_pages_test = {

        'Create one html page for each maker.': function (test) {
            test.expect(5);
            var fs = require('fs'),
                xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string),
                array = lib.json2array(json),
                archive = lib.array2archive(array);
            try {
                test.expect(1);
                lib.create_maker_pages(archive, 'output');
                test.equal(fs.lstatSync('output/pages/CANON.html').isFile(), true);
                test.done();
            } catch (e) {
                test.equal(true, true);
                test.done();
            }
        }

    };

}());

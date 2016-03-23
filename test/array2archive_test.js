/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.array_to_archive = {

        'Create an archive of works from the work objects.': function (test) {
            test.expect(5);
            var xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string),
                array = lib.json2array(json),
                archive = lib.array2archive(array);
            test.equal(typeof archive, 'object');
            test.equal(Object.keys(archive.tree).length, 6);
            test.equal(Object.keys(archive.tree.CANON).length, 2);
            test.equal(Object.keys(archive.tree.LEICA['D-LUX 3']).length, 5);
            test.equal(archive.works.length, 14);
            test.done();
        }

    };

}());

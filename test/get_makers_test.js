/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.get_makes = {

        'Get all camera makers.': function (test) {
            test.expect(5);
            var xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string),
                array = lib.json2array(json),
                archive = lib.array2archive(array),
                makes = lib.get_makers(archive);
            test.equal(typeof makes, 'object');
            test.equal(makes.constructor, Array);
            test.equal(makes.length, 6);
            test.equal(makes[0].name !== undefined, true);
            test.equal(makes[0].id !== undefined, true);
            test.done();
        }

    };

}());

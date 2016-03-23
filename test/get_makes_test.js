/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.get_makes = {

        'Get all camera makers.': function (test) {
            test.expect(3);
            var xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string),
                array = lib.json2array(json),
                archive = lib.array2archive(array),
                makes = lib.get_makes(archive);
            test.equal(typeof makes, 'object');
            test.equal(makes.constructor, Array);
            test.equal(Object.keys(makes).length, 6);
            test.done();
        }

    };

}());

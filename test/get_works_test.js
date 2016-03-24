/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.get_works_test = {

        'Get all works of the given camera maker and model.': function (test) {
            test.expect(3);
            var xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string),
                array = lib.json2array(json),
                archive = lib.array2archive(array),
                works = lib.get_works(archive, 'CANON', 'CANON EOS 20D');
            test.equal(typeof works, 'object');
            test.equal(works.constructor, Array);
            test.equal(works.length, 1);
            test.done();
        }

    };

}());

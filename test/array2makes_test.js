/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.string_to_object = {

        'Extract all the camera makes from the array.': function (test) {
            test.expect(3);
            var xml_string = lib.xml2string('resources/xml/works.xml'),
                json = lib.string2json(xml_string),
                array = lib.json2array(json),
                urls = lib.array2makes(array);
            test.equal(typeof urls, 'object');
            test.equal(urls.constructor, Array);
            test.equal(urls.length, 6);
            test.done();
        }

    };

}());
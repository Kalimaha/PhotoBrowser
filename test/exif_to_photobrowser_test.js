/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.exif_to_photobrowser = {
        'Correctly matches pippo string': function (test) {
            test.expect(1);
            test.ok(lib.pippo('Hallo!'));
            test.done();
        }
    };

}());

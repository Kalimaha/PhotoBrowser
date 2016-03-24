/*global exports, require*/
(function () {

    'use strict';

    var lib = require('../src/js/exif_to_photobrowser.js');

    exports.create_maker_id_test = {

        'Get all works of the given camera maker and model.': function (test) {
            test.expect(1);
            var maker = 'NIKON CORPORATION',
                maker_id = lib.create_maker_id(maker);
            test.equal(maker_id, 'NIKON');
            test.done();
        }

    };

}());

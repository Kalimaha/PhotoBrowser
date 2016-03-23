'use strict';

var grunt = require('grunt');
var palindrode = require('../tasks/exif_to_photobrowser.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.exif_to_photobrowser = {
    'correctly matches palindrome string': function(test) {
        test.expect(1);
        test.ok(palindrode.test('Was it a car or a cat I saw?'));
        test.done();
    }
};

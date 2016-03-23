/*
 * grunt-exif-to-photobrowser
 * https://github.com/Kalimaha/grunt-exif-to-photobrowser
 *
 * Copyright (c) 2016 Guido Barbaglia
 * Licensed under the MIT license.
 */

'use strict';

exports.test = function(string) {
  string = string.match(/[a-z0-9]/gi).join('').toLowerCase();
  return string === string.split('').reverse().join('');
};

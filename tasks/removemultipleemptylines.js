/*
 * grunt-remove-multiple-empty-lines
 * https://github.com/jonasklering/grunt-remove-multiple-empty-lines
 *
 * Copyright (c) 2021 jonasklering
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('removemultipleemptylines', 'Very simple and lightweight cleaner that just removes multiple empty lines from any kind of files', function () {

		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
			// Concat specified files.
			var src = f.src.filter(function (filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function (filepath) {
				// Read file source.
				return grunt.file.read(filepath);
			}).join(grunt.util.linefeed);

			src = src.replace(/(^\s*(\r|\n)){2,}|^\s+(\r|\n)?\Z/gm, "\r\n");

			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
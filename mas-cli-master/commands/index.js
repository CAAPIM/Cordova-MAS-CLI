//
//  Copyright (c) 2017 CA. All rights reserved.
//
//  This software may be modified and distributed under the terms
//  of the MIT license. See the LICENSE file for details.
//

var fs = require('fs');
var path = require('path');

module.exports = function commandLoader(program) {
	'use strict';

	var commands = {};
	var loadPath = path.dirname(__filename);

	// Loop though command files
	fs.readdirSync(loadPath).filter(function (filename) {
		return (/\.js$/.test(filename) && filename !== 'index.js');
	}).forEach(function (filename) {
		var name = filename.substr(0, filename.lastIndexOf('.'));

		// Require command
		var command = require(path.join(loadPath, filename));

		// Initialize command
		commands[name] = command(program);
	});

	return commands;
};

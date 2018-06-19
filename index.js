#! /usr/bin/env node

//
//  Copyright (c) 2017 CA. All rights reserved.
//
//  This software may be modified and distributed under the terms
//  of the MIT license. See the LICENSE file for details.
//

var fs = require('fs');
var util = require('util');
var clear = require('clear');
var  chalk = require('chalk');
var  figlet = require('figlet');
var program = require('commander');
var status = require('./lib/status');
var packageJson = require('./package.json');
var commands = require('./commands')(program);

program.LOG_PATH = process.env.HOME + '/.mas-cli-log';

clear();

console.log(
  chalk.cyan(
    
    figlet.textSync(
      'mas',
      {
        kerning: 'full',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      }) + 'CLI 1.0.0 \n\n'
  )
);

// Initialize mas-cli options
program
	.version(packageJson.version)
	.usage('<command> [options]');

// Initialize prompt
program.prompt = require('prompt');
program.prompt.message = '';
program.prompt.delimiter = '';
program.prompt.colors = false;

// Turn off colors when non-interactive
var colors = require('colors');
colors.mode = process.stdout.isTTY ? colors.mode : 'none';

// Setup logging and messaging
var logMessages = [];
program.log = (function (debugMode) {
	return function _log(logEntry, noPrint) {
		logMessages.push(logEntry);
		if (!noPrint && debugMode) {
			console.log('--debug-- '.cyan + logEntry);
		}
	};
})(process.argv.indexOf('--debug') >= 0);

program.successMessage = function successMessage() {
	var msg = util.format.apply(this, arguments);
	program.log('Success: ' + msg, true);
	console.log(msg.green);
};

program.errorMessage = function errorMessage() {
	var msg = util.format.apply(this, arguments);
	program.log('Error: ' + msg, true);
	console.log(msg.red);
};

program.handleError = function handleError(err, exitCode) {
	if (err) {
		if (err.message) {
			program.errorMessage(err.message);
		} else {
			program.errorMessage(err);
		}
	}

	console.log('For more information see: ' + program.LOG_PATH);

	fs.appendFileSync(program.LOG_PATH, logMessages.join('\n') + '\n');

	process.exit(exitCode || 1);
};

program.handleSuccess = function handleError(success, exitCode) {
	if (success) {
		if (success.message) {
			program.successMessage(success.message);
		} else {
			program.successMessage(success);
		}
	}

	console.log('For more information see: ' + program.LOG_PATH);

	fs.appendFileSync(program.LOG_PATH, logMessages.join('\n') + '\n');

	process.exit(exitCode || 0);
};

// Create request wrapper
program.request = function (opts, next) {
  if (program.debug) {
    program.log('REQUEST: '.bold + JSON.stringify(opts, null, 2));
  } else {
  	program.log(opts.uri);
  }
  status.start();
  return request(opts, function (err, res, body) {
  	status.stop();
    if (err) {
      if (program.debug) {
        program.errorMessage(err.message);
      }
      return next(err, res, body);
    }
    else {
      if (program.debug) {
        program.log('RESPONSE: '.bold + JSON.stringify(res.headers, null, 2));
        program.log('BODY: '.bold + JSON.stringify(res.body, null, 2));
      }
      return next(err, res, body);
    }
  });
};

program.on('*', function() {
	console.log('Unknown Command: ' + program.args.join(' '));
	program.help();
});

var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

program.log('\n' + datetime + '\n' + 
'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + '\n');

// Process Commands
program.parse(process.argv);



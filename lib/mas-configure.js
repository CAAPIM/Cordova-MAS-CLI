#! /usr/bin/env node

//
//  Copyright (c) 2017 CA. All rights reserved.
//
//  This software may be modified and distributed under the terms
//  of the MIT license. See the LICENSE file for details.
//

'use strict';

/**
 * Module dependencies.
 */

const __masConfigiOS = require('./iOS/mas-configure-ios'),
    __masConfigAndroid = require('./android/mas-configure-android');

var fs          = require('fs'),    
    path        = require('path'),
    chalk       = require('chalk'),
    shell       = require('shelljs'),
    resolve     = require('path').resolve;

var program     = require('commander');


var __masConfigure = {

    'configure': function (options) {

        var msso_path = options.path ? resolve(options.path) : require('os').homedir() + '/masconfig/msso_config.json';

        var optionsStr = options.path ? '-p ' + options.path : '';

        var command = 'mas configure ' + optionsStr;

        shell.echo(chalk.cyan('===========>>> ' + command + ' <<<============'));

        program.log('\n' + command + '\n');

        // Abort if the msso config path doesn't exist...
        if (!fs.existsSync(msso_path) || path.extname(msso_path) !== '.json') {

            program.handleError('\n' + 'Config file does not exist @ path : ' + path + '\n' + 'Or is of incorrect format.' + '\n');
        }

        //
        // Check if this command is run from inside the project 
        if (!fs.existsSync('platforms/')) {
            program.handleError('Please run this command from inside the project folder.')
        }
        //
        //  Configure an android project.
        //
        if (fs.existsSync('platforms/android/android.json')) {
            __masConfigAndroid.configure(msso_path);
        }
        
        //
        //  Configure an iOS project.
        //
        if (fs.existsSync('platforms/ios/ios.json')) {
            __masConfigiOS.configure(msso_path);
        }        
    }
}

/**
 * Expose ` all apis
 */
module.exports = __masConfigure;
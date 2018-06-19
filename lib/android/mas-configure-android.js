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

var fs = require('fs'),
    chalk = require('chalk'),
    shell = require('shelljs');

var program = require('commander');


var __masConfigAndroid = {

    'configure': function (path) {

        var androidConfigPath;
        if (fs.existsSync('platforms/android/app/src/main/assets/'))
            androidConfigPath = 'platforms/android/app/src/main/assets/msso_config.json'
        else
            androidConfigPath = 'platforms/android/assets/msso_config.json'

        shell.echo('\n' + chalk.cyan('Configuring ' + 'Android-Cordova project with : ') + chalk.yellow(path) + '\n');

        program.log('\n' + 'Configuring ' + 'Android-Cordova project with : ' + path + '\n');

        //fs.createReadStream(path).pipe(fs.createWriteStream(androidConfigPath));
        fs.writeFileSync(androidConfigPath, fs.readFileSync(path));
        
        program.successMessage('\n' + 'Successfully configured ' + 'Android cordova project with : ' + androidConfigPath + '\n');
    }
}

/**
 * Expose ` all apis
 */
module.exports = __masConfigAndroid;
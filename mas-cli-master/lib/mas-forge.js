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

var fs      = require('fs'),
    chalk   = require('chalk'),
    shell   = require('shelljs'),
    resolve = require('path').resolve;

var program = require('commander');

var __masForge  = {

    'forge': function (name, options) {

        // Get the absolute path.
        var path = resolve(name);

        // If the path already exists abort...
        if (fs.existsSync(path)) {
            
            program.handleError('\n' + 'Path already exists : ' + path + '\n', -1);
        }

        var optionsStr = options.ios ? '-i' : '';
        optionsStr = optionsStr + (options.android ? (options.ios ? 'a' : '-a') : '');
        optionsStr = optionsStr + ' ' + (options.package ? '-p ' + options.package : '');
        var command = 'mas forge ' + optionsStr + ' ' + name;

        shell.echo(chalk.cyan('===========>>> ' + command + ' <<<============'));

        program.log( '\n' + command + '\n');

        shell.echo('\n' + chalk.cyan('Forging new cordova project @ : ') + chalk.yellow(path) + '\n');

        program.log('\n' + 'Forging new cordova project @ : ' + path + '\n')

        // Cordova create command
        command = 'cordova create ' + path + ' ' + (options.package ? options.package : 'com.company.' + name) + ' ' + name;

        shell.echo('\n' + chalk.cyan(command) + '\n');

        program.log('\n' + command + '\n');

        shell.exec(command, function (code, stdout, stderr) {

            if (code !== 0 || stderr) {
                
                program.handleError('\n' + 'Failed : ' + command + '\n\n' + 'stderr : ' + '\n' + stderr, -1);
            }

            program.successMessage('\n' + 'Successfully forged cordova project @ : ' + path + '\n');

            shell.cd(path);
            
            var platforms = options.ios ? 'ios' : undefined;
                platforms = (platforms === undefined) ? ((options.android) ? 'android' : undefined) : ((options.android) ? platforms + ' android' : platforms);
                platforms = (platforms === undefined) ? ((process.platform === 'darwin') ? 'ios' : 'android') : platforms;

            shell.echo('\n' + chalk.cyan('Adding platforms ' + platforms + ' to cordova project @ : ') + chalk.yellow(path) + '\n')
            
            program.log('\n' + 'Adding platforms ' + platforms + ' to cordova project @ : ' + path + '\n');

            command = 'cordova platform add ' + platforms;

            shell.echo('\n' + chalk.cyan(command) + '\n');

            program.log('\n' + command + '\n');

            shell.exec(command, function (code, stdout, stderr) {

                if (code !== 0 || stderr) {

                    program.handleError('\n' + 'Failed : ' + command + '\n\n' + 'stderr : ' + '\n' + stderr, -1);
                }

                program.handleSuccess('\n' + 'Successfully added platforms ' + platforms + ' to project @ : ' + path + '\n')
            });
        });
    }
}

/**
 * Expose all apis
 */
module.exports = __masForge;





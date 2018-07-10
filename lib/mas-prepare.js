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

const __masPrepareiOS = require('./iOS/mas-prepare-ios'),
    __masPrepareAndroid = require('./android/mas-prepare-android');

var fs = require('fs'),
    chalk = require('chalk'),
    shell = require('shelljs'),
    resolve = require('path').resolve,
    compareVersions = require('compare-versions');

var program = require('commander');

var     mascliJson = require('../mas-cli.json');


var __masPrepare = {

    'prepare': function (template, options) {

        var that = this,
            framework = ["MASFoundation"],
            pluginDir = 'cordova-plugin-mas-core';

        var optionsStr = options.path ? ' -p ' + options.path : '';
        
        var command = 'mas prepare ' + optionsStr + ' ' + (template === undefined ? '' : template);

        shell.echo(chalk.cyan('===========>>> ' + command + ' <<<============'));

        program.log('\n' + command + '\n');

        // Resolve optional template input.
        template = (template === undefined) ? 'core' : template;

        // Process template        
        if (template === 'storage') {

            framework.push('MASStorage');
            pluginDir = 'cordova-plugin-mas-storage'
        }
        else if (template === 'identitymanagement') {

            framework.push('MASIdentityManagement');
            pluginDir = 'cordova-plugin-mas-identitymanagement';
        }
        else if (template === 'connecta') {

            framework.push('MASConnecta');
            pluginDir = 'cordova-plugin-mas-connecta';
        }

        // cordova pluign add 
        command = 'cordova plugin add ' + pluginDir;

        shell.echo('\n' + chalk.cyan(command) + '\n');

        program.log('\n' + command + '\n');

        shell.exec(command, function (code, stdout, stderr) {

            // Check if plugins are added ??
            if (!fs.existsSync('./plugins/' + pluginDir) ||
                !fs.existsSync('./plugins/' + 'cordova-plugin-mas-core')) {

                program.handleError('\n' + 'Failed : ' + command + '\n\n' + 'stderr : ' + '\n' + stderr, -1);
            }

            //
            //  Prepare an iOS project.
            //
            if (fs.existsSync('platforms/ios/ios.json'))
                __masPrepareiOS.prepare(framework, options);

            //
            //  Prepare an android project.
            //
            if (fs.existsSync('platforms/android/android.json'))
                __masPrepareAndroid.prepare(options);

            // Copy the app file to ./www
            var path;
            if(options.path && fs.existsSync(options.path)){
                path = options.path.replace(/\s/g, "\\ ");
                if (options.path.endsWith('/')){
                     path = path + '* ' ;
                } else {
                    path = path +'/* ' ;
                }

            } else {
                
                path = shell.pwd() + '/plugins/cordova-plugin-mas-' + template + '/sample/html/* ' ;

            }
            command = 'cp -R ' + path  + shell.pwd() + '/www/';

            shell.echo('\n' + chalk.cyan(command) + '\n');

            program.log('\n' + command + '\n');

            shell.exec(command, function (code, stdout, stderr) {

                if (code !== 0 || stderr) {

                    program.handleError('\n' + 'Failed : ' + command + '\n\n' + 'stderr : ' + '\n' + stderr, -1);
                }

                // cordova prepare
                command = 'cordova prepare';

                shell.echo('\n' + chalk.cyan(command) + '\n');

                program.log('\n' + command + '\n');

                shell.exec(command, function (code, stdout, stderr) {

                    if (code !== 0 || stderr) {

                        program.handleError('\n' + 'Failed : ' + command + '\n\n' + 'stderr : ' + '\n' + stderr, -1);
                    }

                    // Completed !!
                    var sampleHTML = (options.path && fs.existsSync(options.path)) ? resolve(options.path) + '/index.html' : shell.pwd() + '/plugins/cordova-plugin-mas-' + template + '/sample/html/index.html';
                    program.handleSuccess('\n' + 'Successfully prepared cordova project with : ' + sampleHTML + '\n');
                });
            });
        });
    }
}

/**
 * Expose ` all apis
 */
module.exports = __masPrepare;

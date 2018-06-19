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
    shell = require('shelljs'),
    resolve = require('path').resolve,
    compareVersions = require('compare-versions');

var program = require('commander');

var mascliJson = require('../../mas-cli.json');

var __masPrepareiOS = {

    'appendPodEntry': function (framework, version) {

        var data = fs.readFileSync('Podfile');
        var array = data.toString().split("\n");

        var podEntry = undefined;
        for (var i = 0; i < framework.length; i++) {

            var frameworkFound = false;
            for (var j = 0; j < array.length; j++) {

                if ((array[j].indexOf(framework[i]) >= 0)) {

                    if ((array[j].indexOf(version) >= 0))
                        frameworkFound = true;
                    else
                        array.splice(j, 1);

                    break;
                }
            }

            if (!frameworkFound) {
                if (podEntry === undefined)
                    podEntry = 'pod ' + '\'' + framework[i] + '\'' + ', ' + '\'' + '~> ' + version + '\'' + '\n';
                else
                    podEntry = podEntry + 'pod ' + '\'' + framework[i] + '\'' + ', ' + '\'' + '~> ' + version + '\'' + '\n';
            }
        }

        if (podEntry !== undefined) {

            for (var i = 0; i < array.length; i++) {

                if (array[i].indexOf('# Pods for') !== -1 ||
                    array[i].indexOf('.xcodeproj') !== -1) {

                    array.splice(i + 2, 0, podEntry);
                    break;
                }
            }

            if (shell.exec('rm Podfile').code !== 0) {

                shell.echo('Error: rm Podfile failed !!');
                shell.exit(1);
            }

            for (var i = 0; i < array.length; i++) {
                fs.appendFileSync('Podfile', array[i] + '\n');
            }
        }
    },

    'appendPodPlatform': function (platform) {

        var data = fs.readFileSync('Podfile');
        var array = data.toString().split("\n");

        array.splice(1, 1, 'platform :ios, ' + '\'' + platform + '\'');

        if (shell.exec('rm Podfile').code !== 0) {

            shell.echo('Error: rm Podfile failed !!');
            shell.exit(1);
        }

        for (var i = 0; i < array.length; i++) {
            fs.appendFileSync('Podfile', array[i] + '\n');
        }
    },

    'prepare': function (framework, options) {

        var command, that = this;        

        // Check if pods are already added ??
        if ((framework.length > 1 && !fs.existsSync('./platform/ios/Pods/' + framework[1])) ||
            !fs.existsSync('./plaforms/ios/Pods/' + 'MASFoundation')) {

            shell.cd('./platforms/ios/');

            // If Podfile is not created - pod init.
            if (!fs.existsSync('Podfile')) {

                // pod init
                command = 'pod init';

                shell.echo('\n' + chalk.cyan(command) + '\n');

                program.log('\n' + command + '\n');

                if (shell.exec(command).code !== 0) {

                    program.handleError('\n' + 'Failed : ' + command + '\n\n' + 'stderr : ' + '\n' + stderr, -1);
                }
            }

            // Cocoapods entry for minimum iOS version supported.
            that.appendPodPlatform(mascliJson.cocoapods.plaform_version);

            // Cocoapods entry for frameworks of particular revision.
            that.appendPodEntry(framework, mascliJson.cocoapods.pod_version);

            // pod install
            command = 'pod install';

            shell.echo('\n' + chalk.cyan(command) + '\n');

            program.log('\n' + command + '\n');

            if (shell.exec(command).code !== 0) {

                program.handleError('\n' + 'Failed : ' + command + '\n\n', -1);
            }

            shell.cd('../../');
        }
    }
}

/**
 * Expose ` all apis
 */
module.exports = __masPrepareiOS;
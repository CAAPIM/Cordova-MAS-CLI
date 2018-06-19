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

var __masPrepareAndroid = {

    'appendJcenterEntry': function (version) {
        var filePath;
        try {
            if (fs.existsSync('platforms/android/app/')) {
                filePath = './platforms/android/app/build.gradle';
            } else {
                filePath = './platforms/android/build.gradle';
            }

            var data = fs.readFileSync(filePath);
            var array = data.toString().split("\n");
            if (data.indexOf('com.ca:mas') < 0) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].search(/fileTree/g) != -1) {
                        array.splice(i + 1, 0, 'implementation \'com.ca:mas:' + version + '\'' + '\n' + 'implementation \'com.ca:masui:' + version + '\'');
                        break;
                    }
                }
            }

            var fileContent = array.join("\n");
            fs.truncate(filePath, 0, function () {
                fs.writeFile(filePath, fileContent, function (err) {
                    if (err) {
                        return console.log("Error writing file: " + err);
                    }
                });
            });
        } catch (err) {
            program.handleError(err)
        }
    },

    'prepare': function (options) {

        var that = this;

        // Add Jcenter entry.
        that.appendJcenterEntry(mascliJson.mas.jcenter_version);
    }
}

/**
 * Expose ` all apis
 */
module.exports = __masPrepareAndroid;
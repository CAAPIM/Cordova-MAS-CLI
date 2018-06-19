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

var __masPurge  = {

    'purge': function () {

        var command = 'mas purge';
        var path = process.env.HOME + '/.mas-cli-log';

        shell.echo(chalk.cyan('===========>>> ' + command + ' <<<============'));

        program.log( '\n' + command + '\n');

        shell.echo('\n' + chalk.cyan('Clearing logs  @ : ') + chalk.yellow(path) + '\n');

        fs.truncate(path, 0, function(){console.log('Logs successfully cleared')})
    }
}

/**
 * Expose all apis
 */
module.exports = __masPurge;





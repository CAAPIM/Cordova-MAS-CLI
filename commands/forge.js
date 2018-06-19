//
//  Copyright (c) 2017 CA. All rights reserved.
//
//  This software may be modified and distributed under the terms
//  of the MIT license. See the LICENSE file for details.
//

module.exports = function forgeCommand(program) {
    'use strict';

    const   __masForge  = require('../lib/mas-forge');
    
    var     packageJson = require('../package.json');

    let forge = (name, options) => {

        __masForge.forge(name, options);
    };

    program
        .command('forge <name>')
        .description('\n\n Synopsis \n\n\t mas forge [options] <NAME> \n\n\t Create a MAS project \n\n\t\t NAME ......................... The name of your project directory. \n\n\n')
        .option('-i, --ios', 'Add platform iOS')
        .option('-a, --android', 'Add platform Android')
        .option('-p, --package <package>','Specify the bundle ID/application ID for your app (Reverse-domain-style package name - used in <widget id>)')
        .action(forge)
};

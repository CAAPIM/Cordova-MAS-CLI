//
//  Copyright (c) 2017 CA. All rights reserved.
//
//  This software may be modified and distributed under the terms
//  of the MIT license. See the LICENSE file for details.
//

module.exports = function configureCommand(program) {
    'use strict';

    const __masConfigure = require('../lib/mas-configure');

    let configure = (options) => {

        __masConfigure.configure(options);
    };

    program
        .command('configure')
        .description('\n\n Synopsis \n\n\t mas configure \n\n\t Configure a MAS project \n\n\n')
        .option('-p, --path <path>', 'Alternate path to fetch msso_config.json from.')
        .action(configure)
};
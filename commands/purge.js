//
//  Copyright (c) 2017 CA. All rights reserved.
//
//  This software may be modified and distributed under the terms
//  of the MIT license. See the LICENSE file for details.
//

module.exports = function purgeCommand(program) {
    'use strict';

    const   __masForge  = require('../lib/mas-purge');
    

    let purge = () => {

        __masForge.purge();
    };

    program
        .command('purge')
        .description('\n\n Synopsis \n\n\t mas purge [options]\n\n\t Clear logs \n\n')
        .action(purge)
};

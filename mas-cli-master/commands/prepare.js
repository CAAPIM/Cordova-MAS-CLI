//
//  Copyright (c) 2017 CA. All rights reserved.
//
//  This software may be modified and distributed under the terms
//  of the MIT license. See the LICENSE file for details.
//

module.exports = function forgeCommand(program) {
    'use strict';

    const   __masPrepare     = require('../lib/mas-prepare');

    let prepare = (template, options) => {

        __masPrepare.prepare(template, options);        
    };

    program
        .command('prepare [template]')
        .description('\n\n Synopsis \n\n\t mas prepare [TEMPLATE] \n\n\t Prepare a MAS project \n\n\t\t TEMPLATE ..................... Starter named templates (ex: core, storage, identitymanagement, connecta)\n\t\t\t\t\t\tIf TEMPLATE is not provided \'core\' will be used by default')
        .option('-p, --path <path>','Path to the application files to be used to prepare the project with.')
        .action(prepare)
};

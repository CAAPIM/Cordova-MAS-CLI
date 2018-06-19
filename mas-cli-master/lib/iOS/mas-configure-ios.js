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

var fs          = require('fs'),
    chalk       = require('chalk'),
    plist       = require('plist'),
    xcode       = require('xcode'),
    shell       = require('shelljs'),
    fileHound = require('filehound');
    
var program = require('commander');


var __masConfigiOS = {

    'configure': function (path) {

        var iOSConfigPath = process.cwd() + '/platforms/ios/msso_config.json';
        fs.writeFileSync(iOSConfigPath, fs.readFileSync(path));

        shell.echo('\n' + chalk.cyan('Configuring ' + 'iOS-Cordova project with : ') + chalk.yellow(iOSConfigPath) + '\n');

        program.log('\n' + 'Configuring ' + 'iOS-Cordova project with : ' + iOSConfigPath + '\n');

        //
        //  Configure MAS iOS project with msso_config.json.
        //  Add Run script to remove the simulator file that is required to successfully deploy your app to the Apple Store.
        //
        fileHound.create()
            .paths('./platforms/ios/')
            .depth(0)
            .ext('pbxproj')
            .find()
            .then(files => {
                files.forEach(file => {

                    var ProjectDir = (file.split("/").slice(-2)[0]).split(".")[0];

                    //
                    //  Configure authorization for location services. 
                    //
                    fileHound.create()
                        .paths('./platforms/ios/' + ProjectDir + '/')
                        .depth(0)
                        .ext('plist')
                        .match('*' + ProjectDir + '-Info*')
                        .find()
                        .then(files => {
                            files.forEach(file => {
                                var infoPlist = plist.parse(fs.readFileSync(file, 'utf8'));

                                infoPlist.NSLocationWhenInUseUsageDescription =
                                    infoPlist.NSLocationAlwaysUsageDescription =
                                    infoPlist.NSLocationAlwaysAndWhenInUseUsageDescription =
                                    'The application requires location services to connect to MAS backend services.';

                                fs.writeFileSync(file, plist.build(infoPlist));

                                program.successMessage('\n' + 'Successfully configured authorization for iOS location services.' + '\n');
                            });
                        });

                    var appProj = xcode.project(file);

                    appProj.parse(function (err) {

                        //
                        //  Add the msso_config.json to resources directory of the XCode project.
                        //
                        appProj.addResourceFile(iOSConfigPath);

                        //
                        //  Add the XCode proejct buildPhase 'Run Script' Shell script.
                        //  The script removes the simulator file that is required to successfully deploy your app to the Apple Store.
                        //
                        var script = "APP_PATH=\"${TARGET_BUILD_DIR}/${WRAPPER_NAME}\"\n\n# This script loops through the frameworks embedded in the application and\n# removes unused architectures.\nfind \"$APP_PATH\" -name '*.framework' -type d | while read -r FRAMEWORK\ndo\nFRAMEWORK_EXECUTABLE_NAME=$(defaults read \"$FRAMEWORK/Info.plist\" CFBundleExecutable)\nFRAMEWORK_EXECUTABLE_PATH=\"$FRAMEWORK/$FRAMEWORK_EXECUTABLE_NAME\"\necho \"Executable is $FRAMEWORK_EXECUTABLE_PATH\"\n\nEXTRACTED_ARCHS=()\n\nfor ARCH in $ARCHS\ndo\necho \"Extracting $ARCH from $FRAMEWORK_EXECUTABLE_NAME\"\nlipo -extract \"$ARCH\" \"$FRAMEWORK_EXECUTABLE_PATH\" -o \"$FRAMEWORK_EXECUTABLE_PATH-$ARCH\"\nEXTRACTED_ARCHS+=(\"$FRAMEWORK_EXECUTABLE_PATH-$ARCH\")\ndone\n\necho \"Merging extracted architectures: ${ARCHS}\"\nlipo -o \"$FRAMEWORK_EXECUTABLE_PATH-merged\" -create \"${EXTRACTED_ARCHS[@]}\"\nrm \"${EXTRACTED_ARCHS[@]}\"\n\necho \"Replacing original executable with thinned version\"\nrm \"$FRAMEWORK_EXECUTABLE_PATH\"\nmv \"$FRAMEWORK_EXECUTABLE_PATH-merged\" \"$FRAMEWORK_EXECUTABLE_PATH\"\n\ndone";
                        var options = { shellPath: '/bin/sh', shellScript: script };
                        var buildPhase = appProj.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Run a script', appProj.getFirstTarget().uuid, options).buildPhase;

                        fs.writeFileSync(file, appProj.writeSync());

                        program.successMessage('\n' + 'Successfully configured ' + 'iOS cordova project with : ' + iOSConfigPath + '\n');
                    });
                });
            });
    }
}

/**
 * Expose all apis
 */
module.exports = __masConfigiOS;
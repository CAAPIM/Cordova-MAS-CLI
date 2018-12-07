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
   shell = require('shelljs');
var program = require('commander');

var __masPrepareAndroid = {

   'updateManifestFile': function() {

      try {
         var service = "<service android:exported=\"false\" android:name=\"com.ca.mas.core.storage.sharedstorage.MASAuthenticatorService\">\n" +
            "    <intent-filter>\n" +
            "     <action android:name=\"android.accounts.AccountAuthenticator\" />\n" +
            "     </intent-filter>\n" +
            "     <meta-data android:name=\"account.name\" android:resource=\"@string/acc_name\" />\n" +
            "     <meta-data android:name=\"android.accounts.AccountAuthenticator\" android:resource=\"@xml/authenticator\" />\n" +
            "    </service>";
         var activity = '</activity>';

         var filePath = './platforms/android/app/src/main/AndroidManifest.xml';
         if (fs.existsSync(filePath)) {
            var data = fs.readFileSync(filePath);
            var array = data.toString().split("\n");
            if (data.indexOf(activity) > 0 && data.indexOf('MASAuthenticatorService') < 0) {

               for (var i = 0; i < array.length; i++) {
                  if (array[i].search(activity) != -1) {
                     array.splice(i + 1, 0, service);
                     break;
                  }
               }
            }

            var fileContent = array.join("\n");
            fs.truncate(filePath, 0, function() {
               fs.writeFile(filePath, fileContent, function(err) {
                  if (err) {
                     return console.log("Error writing file: " + err);
                  }
               });
            });
         }


      } catch (err) {
         program.handleError(err)
      }
   },

   'createAuthenticatorXmlFile': function() {
      var path = 'platforms/android/app/src/main/res/xml/authenticator.xml'
      var authenticatorContent = "<account-authenticator xmlns:android=\"http://schemas.android.com/apk/res/android\"\n" +
         "    android:accountType=\"com.ca.core\"\n" +
         "    android:icon=\"@drawable/logo_ca\"\n" +
         "    android:smallIcon=\"@drawable/logo_ca\"\n" +
         "    android:label=\"@string/acc_name\"/>";

      fs.writeFileSync(path, authenticatorContent);
   },

   'updateStringsXml': function() {
      var path = 'platforms/android/app/src/main/res/values/strings.xml'
      if (fs.existsSync(path)) {
         var replaceStr = "    <string name=\"acc_name\">MAS</string>\n" +
            "</resources>";
         var findStr = "</resources>";
         var data = fs.readFileSync(path).toString();
         if (data.indexOf('acc_name') < 0) {
            var result = data.replace(findStr, replaceStr);
            fs.writeFileSync(path, result);
         }

      }
   },

   'updatePropertyFile': function() {
      if (fs.existsSync('platforms/android/project.properties')) {
         var fileP = './platforms/android/project.properties';
         var data = fs.readFileSync(fileP).toString();
         if (data.indexOf('android-28') < 0) {
            var result = data.replace(/android-2[0-7]/g, 'android-28');
            fs.writeFileSync(fileP, result);
         }
      }
   },

   'prepare': function(options) {
      var that = this;
      that.updateManifestFile();
      that.createAuthenticatorXmlFile();
      that.updateStringsXml();
      that.updatePropertyFile();
   }
}

/**
 * Expose ` all apis
 */
module.exports = __masPrepareAndroid;
# CLI Utility for [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/)

> The command line tool to build and manage [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) based applications.

[Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) allows for building native MAS enabled mobile applications using HTML, CSS and JavaScript. <br/>

This tool helps with [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) plugin integration as well as management of multi-platform [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) based applications.

# Installation
Install the command line tool using the npm utility of Node.js. The CLI tool will automatically be downloaded by the npm utility.

On Windows (Cygwin Or Git Bash):    
```bash    
    $npm install -g mas-cli
```    
    
On Mac OS X and Linux:
```bash    
    $sudo npm install -g mas-cli
```

# Forging and preparing a new [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) project
This simple example demonstrates how mas-cli can be used to create a `myApp` project with the `storage` template and run it for `iOS` platform.

```bash
    mas forge -i myApp
    cd myApp
    mas prepare storage   
    
    // ----> mas-cli ends its role here
    // Using cordova to build and run

    cordova requirements ios    
    cordova build ios --verbose
    cordova run ios
```


# Supported Versions

- [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/)       : 1.7.00
- Cordova   : 8.0.0 or later
- Cocoapods : 1.4.0 or later
- XCode	    : 9.3.1 or later
- Android Studio: 3.1.1 or later
- Node.js   : 8.11.1 or later


# mas-cli Quick Reference

## mas forge command

This command creates a new Cordova Project in the current directory with specified name and adds Platform (iOS/Android) based on the options given in the command.

Usage: forge [options] <NAME>
 
 Synopsis 

	 mas forge [options] <NAME> 

	 Create a MAS project 

		 NAME ......................... The name of your project directory. 

  Options:

    -i, --ios                Add platform iOS
    -a, --android            Add platform Android
    -p, --package <package>  Specify the bundle ID/application ID for your app (Reverse-domain-style package name - used in <widget id>)
    -h, --help               output usage information


## mas prepare command

This command adds the [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) plugins based on the specified template and prepares the project with the file path specified. It should be executed from inside a valid Cordova project.

Usage: prepare [options] [template]  

 Synopsis 

	 mas prepare [TEMPLATE] 

	 Prepare a MAS project 

		 TEMPLATE ..................... Starter named templates (ex: core, storage, identitymanagement, connecta)
						If TEMPLATE is not provided 'core' will be used by default

  Options:

    -p, --path <path>          Path to the application files directory to be used to prepare the project with. The given path root should contain index.html at least.
    -h, --help                 output usage information

## mas purge command

This command clears the mas-cli logs.

Usage: purge [options]

 Synopsis 

	 mas purge

	 Clear logs 

  Options:

    -h, --help  output usage information

# Docs
- [Overview of Mobile SDK for Cordova]
- [Create your first Mobile SDK for Cordova app]
- [Full reference docs for mas-cli][Reference docs] has details of commands to forge, prepare and purge [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) based projects. 


# How You Can Contribute
This utility is an open source project and contributors are needed to keep this project moving forward.
Contributions are welcome and much appreciated. To learn more, see the [Contribution Guidelines][Contributing].


# Communication
- *Have general questions or need help?*, use [Stack Overflow][StackOverflow]. (Tag 'massdk')
- *Find a bug?*, open an issue with the steps to reproduce it.
- *Request a feature or have an idea?*, open an issue.

## License
Copyright (c) 2016 CA. All rights reserved.

This software may be modified and distributed under the terms of the MIT license. See the [LICENSE][LICENSE FILE] file for details.


[Overview of Mobile SDK for Cordova]: http://mas.ca.com/docs/cordova/1.7.00/guides/#mas-plugin-overview
[Create your first Mobile SDK for Cordova app]: http://mas.ca.com/docs/cordova/1.7.00/guides/#set-up-project-and-start-the-sdk
[Reference docs]: ./Reference.md
[StackOverflow]: http://stackoverflow.com/questions/tagged/massdk
[Contributing]: /CONTRIBUTING.md
[LICENSE FILE]: /LICENSE

# MAS CLI

> The command line tool to build and manage [MAS](https://www.ca.com/us/developers/mas.html) Cordova-based applications.

[MAS Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) allows for building native MAS enabled mobile applications using HTML, CSS and JavaScript. 
This tool helps with management of multi-platform MAS Cordova applications as well as MAS Cordova plugin integration.

# Installation
Install the mas cli command line tool using the npm utility of Node.js. The mas cli tool will automatically be downloaded by the npm utility.

On Windows (Cygwin Or Git Bash):    
```bash    
    $npm install -g mas-cli
```    
    
On OSX and Linux:
```bash    
    $sudo npm install -g mas-cli
```

# Forging and preparing a new MAS Cordova project
This simple example demonstrates how MAS CLI can be used to create a `myApp` project with the `storage` template and run it for `iOS` platform.

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

- MAS       : 1.7.00
- Cordova   : 8.0.0 or above
- Cocoapods : 1.4.0 or above


# mas-cli Quick Reference

## mas forge command

This command creates a new Cordova Project in the current directory with specified name and adds Platform (iOS/Android) based on the options given in the command.

Usage: forge [options] <name>
 
 Synopsis 

	 mas forge [options] <NAME> 

	 Create a MAS project 

		 NAME ......................... The name of your project directory. 

  Options:

    -i, --ios                Add platform iOS
    -a, --android            Add platform Android
    -p, --package <package>  Specify the bundle ID/application ID for your app (Reverse-domain-style package name - used in <widget id>)
    -h, --help               output usage information


## mas prepare Comnand

This command adds the MAS plugins based on the specified template and prepares the project with the file path specified. It should be executed from inside a valid Cordova project.

Usage: prepare [options] [template]  

 Synopsis 

	 mas prepare [TEMPLATE] 

	 Prepare a MAS project 

		 TEMPLATE ..................... Starter named templates (ex: core, storage, identitymanagement, connecta)
						If TEMPLATE is not provided 'core' will be used by default

  Options:

    -r, --revision <revision>  MAS version to be used to prepare the project with.
    -p, --path <path>          Path to the application files to be used to prepare the project with.
    -h, --help                 output usage information

## mas purge Comnand

This command clears the mas-cli logs.

Usage: purge [options]

 Synopsis 

	 mas purge

	 Clear logs 

  Options:

    -h, --help  output usage information

# Docs
- [Overview of MAS Cordova]
- [Create your first MAS Cordova app]
- [Full reference docs for MAS CLI][Reference docs] has details of commands to forge, prepare and purge MAS based projects. 


# How You Can Contribute
MAS CLI is an open source project and contributors are needed to keep this project moving forward.
Contributions are welcome and much appreciated. To learn more, see the [Contribution Guidelines][Contributing].


# TO-DO + Issues
- *Have general questions or need help?*, use [Stack Overflow][StackOverflow]. (Tag 'massdk')
- *Find a bug?*, open an issue with the steps to reproduce it.
- *Request a feature or have an idea?*, open an issue.


[Overview of MAS Cordova]: http://mas.ca.com/docs/cordova/1.7.00/guides/#mas-plugin-overview
[Create your first MAS Cordova app]: http://mas.ca.com/docs/cordova/1.7.00/guides/#set-up-project-and-start-the-sdk
[Reference docs]: ./Reference.md
[StackOverflow]: http://stackoverflow.com/questions/tagged/massdk
[Contributing]: /CONTRIBUTING.md

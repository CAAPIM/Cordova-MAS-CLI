# [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) Command-line-interface (CLI) Reference


## Syntax

```
mas <command> [options]
```


## Global Command List

These commands are available at all times.


|   Commands            |   Description                     | 
| :-------------------- |:----------------------------------| 
| *forge*               | **Forge a MAS Cordova project**   |
| *purge*               | **Purge all cordova-mas-cli logs**   |


## Project Command List

These commands are supported when the current working directory is a valid Cordova project.

|   Commands            |   Description                                                                              | 
| :-------------------- |:-------------------------------------------------------------------------------------------| 
| *prepare*             | **Prepare a MAS project by adding MAS plugins and frameworks based on starter templates.Also                                configure and setup the project with msso_config.json and various required settings.**                               |


## Common options

These options apply to all cordova-mas-cli commands.

|   Option              |   Description                 | 
| :-------------------- |:----------------------------- | 
| *-h or --help*        | **Get help for a command**    |
| *-v or --Version*     | **Get cordova-mas-cli version.**      |


## mas forge command


### Synopsis

Forge the directory structure for the [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) project with the specified name in the current directory and add specified platforms.


### Syntax

```
mas forge [options] name
```

|   Value               |   Description                                                                                                 | 
| :-------------------- |:--------------------------------------------------------------------------------------------------------------| 
| *name*                | **Application's display title that maps name element in cordova config.xml file. This can be changed but there                                may be code generated using this value, such as Java class names.**                                         |


### Defaults

|   Default             |   Description                                                                                                 | 
| :-------------------- |:------------------------------------------------------------------------------------------------------------- | 
| *platform*            | **Default: `ios on MAC OS X / android on Windows` <br> Platform name e.g. android, ios etc. to be added to the                                  project. Unless specified by command options for a project forged on MAC OS X ios platform is added and for                                 windows android platform is added.**                                                                      |
| *package/bundleid*    | **Default:`com.company.name` <br> Reverse domain-style identifier that maps to id attribute of widget element in                                config.xml. This can be changed but there may be code generated using this value, such as Java package names.                               It is recommended that you select an appropriate value using command options.**                           |


### Options

|   Option                      |   Description                                                                                           | 
| :-----------------------------|:--------------------------------------------------------------------------------------------------------| 
| `-i/--ios`                    | **Add ios platform to the project.**                                                                    |
| `-a/--android`                | **Add android platform to the project.**                                                                |
| `-p/--package <package>`      | **Reverse domain-style identifier that maps to id attribute of widget element in config.xml. This can be                                      changed but there may be code generated using this value, such as Java package names. It is recommended                                     that you select an appropriate value.**                                                               |


### Directory Structure

> [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) CLI directory structure is same as that of [Cordova Directory Structure](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#directory-structure)


### Examples

> Forge a [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) project in `myapp` directory using the specified ID and display name and pickup cordova platform based on the system os (Mac OS X --> ios / Windows --> android).

```
mas forge -p com.mycompany.myteam.myapp myapp
```

> Forge a [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) project in `myapp` directory using the specified ID and display name for ios and android platforms:

```
mas forge -ia -p com.mycompany.myteam.myapp myapp
```


## mas prepare command


### Synopsis

Prepare a [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) project by adding [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) plugins and frameworks based on starter templates.Also configure and setup                              the project with msso_config.json and various required settings.


### Syntax

```
mas prepare [options] [template] 
```

|   Value               |   Description                                                                                                 | 
| :-------------------- |:--------------------------------------------------------------------------------------------------------------| 
| *[template]*          | **Starter named templates (ex: core, storage, identitymanagement, connecta) If TEMPLATE is not provided 'core'                                will be used by default.**                                                                                  |


### Defaults

|   Default             |   Description                                                                                                 | 
| :-------------------- |:------------------------------------------------------------------------------------------------------------- | 
| *[template]*          | **Default:`core` <br> By default core/foundation plugins and frameworks are setup by the command.**           |
| *index.html*          | **Default: `plugins/cordova-plugin-mas-template/sample/html/` <br> By default the sample html of plugin related                               the template to be setup is picked up by the command.**                                                      |

### Options

|   Option                      |   Description                                                                                           | 
| :-----------------------------|:--------------------------------------------------------------------------------------------------------| 
| `-r/--revision <revision>`    | **MAS revision to be used to prepare the project with.**                                                |
| `-p/--path <path>`            | **Path to the application files to be used to prepare the project with.**                               |


### Examples

> Prepare a [Mobile SDK for Cordova](http://mas.ca.com/docs/cordova/1.7.00/guides/) project with `storage` template using the latest MAS revision and custom application html, js files at path 
> `<HOME_DIRECTORY>/sample/html/`:

```
mas prepare -p ~/sample/html storage
```


## mas purge command


### Synopsis

Clear cordova-mas-cli logs.


### Syntax

```
mas purge [options]
```

### Examples

```
mas purge
```

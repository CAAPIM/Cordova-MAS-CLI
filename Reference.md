# MAS Command-line-interface (CLI) Reference


## Syntax

```
mas <command> [options]
```


## Global Command List

These commands are available at all times.


|   Commands            |   Description                     | 
| :-------------------- |:----------------------------------| 
| *forge*               | **Forge a MAS Cordova project**   |


## Project Command List

These commands are supported when the current working directory is a valid Cordova project.

|   Commands            |   Description                                                                             | 
| :-------------------- |:------------------------------------------------------------------------------------------| 
| *prepare*             | **Prepare a MAS project by adding MAS plugins and frameworks based on starter templates.Also configure and setup                              the project with msso_config.json and various required settings.**|


### Optional Project Command List

These commands are optional and are required only when you intend to setup up legacy MAS plugins earlier than 1.7.00.

|   Commands            |   Description                                                                             | 
| :-------------------- |:------------------------------------------------------------------------------------------| 
| *configure*           | **Configure and setup a MAS project with msso_config.json and various required settings.**|


## Common options

These options apply to all mas-cli commands.

|   Option              |   Description                 | 
| :-------------------- |:----------------------------- | 
| *-h or --help*        | **Get help for a command**    |
| *-v or --Version*     | **Get mas-cli version.**      |


## mas forge command


### Synopsis

Forge the directory structure for the MAS Cordova project with the specified name in the current directory and add specified platforms.


### Syntax

```
mas forge name [options]
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


### Examples

> Forge a MAS Cordova project in `myapp` directory using the specified ID and display name for ios and android platforms:

```
mas forge -ia -p com.mycompany.myteam.myapp myapp
```


## mas prepare command


### Synopsis

Prepare a MAS project by adding MAS plugins and frameworks based on starter templates.Also configure and setup                              the project with msso_config.json and various required settings.


### Syntax

```
mas prepare [template] [options]
```

|   Value               |   Description                                                                                                 | 
| :-------------------- |:--------------------------------------------------------------------------------------------------------------| 
| *[template]*          | **Starter named templates (ex: core, storage, identitymanagement, connecta) If TEMPLATE is not provided 'core'                                will be used by default.**                                                                                  |


### Defaults

|   Default             |   Description                                                                                                 | 
| :-------------------- |:------------------------------------------------------------------------------------------------------------- | 
| *[template]*          | **Default:`core` <br> By default core/foundation plugins and frameworks are setup by the command.**           |
| *index.html*          | **Default: `plugins/cordova-plugin-mas-template/sample/html/` <br> By default the sample html of plugin related                               to template te be setup is picked up by the command.**                                                      |

### Options

|   Option                      |   Description                                                                                           | 
| :-----------------------------|:--------------------------------------------------------------------------------------------------------| 
| `-r/--revision <revision>`    | **MAS revision to be used to prepare the project with.**                                                |
| `-p/--path <path>`            | **Path to the application files to be used to prepare the project with.**                               |


### Examples

> Prepare a MAS Cordova project with `storage` template using the latest MAS revision and custom application html, js files at path 
> `<HOME_DIRECTORY>/sample/html/`:

```
mas prepare -p ~/sample/html storage
```


## mas configure command


### Synopsis

Configure and setup a MAS project with msso_config.json and various required settings.


### Syntax

```
mas configure [options]
```


### Defaults

|   Default                 |   Description                                                                                             | 
| :-------------------------|:----------------------------------------------------------------------------------------------------------| 
| *msso_config.json path*   | **Default:`<HOME_DIR>/masconfig/msso_config.json` <br> Unless an altername path is provided in the command                                    options by default msso_config.json file is searched in the path `<HOME_DIR>/masconfig/msso_config.json`                                    by the command.**                                                                                       |


### Options

|   Option                      |   Description                                                                                           | 
| :-----------------------------|:--------------------------------------------------------------------------------------------------------| 
| `-p/--path <path>`            | **Alternate path to fetch msso_config.json from.**                                                      |


### Examples

> Configure a MAS Cordova project with altername msso_config.json path at `<HOME_DIR>/Desktop/config/msso_config.json`:

```
mas configure -p ~/Desktop/config/msso_config.json
```
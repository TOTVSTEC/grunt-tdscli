# grunt-tdscli

> Automate TDS tasks.

## Getting Started
This plugin requires Grunt `~1.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tdscli --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tdscli');
```

## The "tdscli" task

### Overview
In your project's Gruntfile, add a section named `tdscli` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tdscli: {
    options: {
      // Task-specific options go here.
    },
    compile: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

#### workspace
Type: `String` 
<!---
Default value: `',  '`
-->

The path to the workspace full path.

#### serverType
Type: `String`
<!--Default value: `'AdvPL'`-->

#### server
Type: `String`

#### build
Type: `String`

#### port
Type: `Number`

#### user
Type: `String`

#### psw
Type: `String`

#### environment
Type: `String`

#### authorization
Type: `String`

#### recompile
Type: `Boolean`
Default value: `false`

#### program
Type: `String` or `Array` 

#### includes
Type: `String` or `Array`


### Targets

#### compile
Compile source files and resources

```js
grunt.initConfig({
  tdscli: {
    options: {

    },
    compile: {
      recompile: true,
      program: [
        "AdvPL/src/cloud.prw",
        "AdvPL/src/sample.cloud",
        "AdvPL/res/logo.png"
      ],
      includes: [
        "C:/dev/include",
        "C:/dev/include-lib"
      ]
    }
  }
});
```

#### deleteprog
Remove source files and resources
```js
```

#### defragrpo
Defragments the server repository
```js
```

#### clearlog
Clears the repository history
```js
```

#### patchgen
Creates an update package
```js
```

#### patchapply
Apply an update package
```js
```

#### patchinfo
Lists the content of an update package
```js
```

#### patchhist
Displays the history of update packages applications
```js
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History
_(Nothing yet)_

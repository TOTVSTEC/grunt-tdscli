/*
 * grunt-tdscli
 * https://github.com/totvstec/grunt-tdscli
 *
 * Copyright (c) 2016
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        tdscli: {
			options: {
                workspace: "C:/Users/roger/Workspaces/TDS_113/",
                serverType: "AdvPL",
                server: "127.0.0.1",
                build: "7.00.150715P",
                port: 5056,
                user: "admin",
                psw: "",
                environment: "ENVIRONMENT",
                authorization: "C:/Users/roger/autoriza.aut",
			},
            compile: {
				recompile: true,
				program: [
					"AdvPL/Koji/MCheckinGS.prw",
					"AdvPL/Koji/sample1.cloud"
				],
				includes: [
					"C:/dev/src/framework/Lib110/include",
					"C:/dev/src/framework/Lib110/include-lib"
				]
            },
			/*
			deleteprog: {
				program: [
					"AdvPL/Koji/MCheckinGS.prw",
					"AdvPL/Koji/sample1.cloud"
				]
			}
			*/
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'tdscli', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};

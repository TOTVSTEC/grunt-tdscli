/*
 * grunt-tdscli
 * https://github.com/totvstec/grunt-tdscli
 *
 * Copyright (c) 2016
 * Licensed under the MIT license.
 */

'use strict';

var _s = require("underscore.string");
var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {

	function _getTdsHome() {
        var home = process.env["TDS_HOME"];

        if (home === undefined) {
            grunt.fail.fatal("Variavel de ambiente 'TDS_HOME' nao definida!");
        }

        home = path.normalize(home);
        if (!_s.endsWith(home, path.sep)) {
            home += path.sep;
        }

        grunt.log.writeln("Usando TDS_HOME='" + home + "'");

        return home;
    }

    function _getTdsCliExecutable(home) {
        var files = fs.readdirSync(home);

        for (var i = 0; i < files.length; i++) {
            if (_s.startsWith(files[i], "tdscli.")) {
                return files[i];
            }
        }

        return null;
    }

    function _buildOptions(home, cli, task) {
        var data = task.data;
        var opts = {
            cmd: home + cli,
            args: [],
            opts: {
                cwd: home
            }
        };

        opts.args.push(task.target);

        if (data.workspace) {
            opts.args.push("-data");
            opts.args.push(data.workspace);
            opts.args.push("workspace=true");
        }

        var keys = Object.keys(data);
        var index = keys.indexOf("workspace");
        if (index > -1) {
            keys.splice(index, 1);
        }

        keys.forEach(function (key, index) {
            var value = key + "=";

            if (Array.isArray(data[key])) {
                value += data[key].join(";");
            }
            else {
                value += data[key];
            }

            opts.args.push(value);
        });

        return opts;
    }


    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('tdscli', 'Compile programas AdvPl.', function () {
        var home = _getTdsHome();
        var cli = _getTdsCliExecutable(home);

        if (cli === null) {
            grunt.fail.fatal("Não foi possivel encontrar o tdscli! Verifique se ele foi instalado!");
        }

        var done = this.async();
        var options = _buildOptions(home, cli, this);

        console.log("\n" + options.cmd + " " + options.args.join(" ") + "\n");

        grunt.util.spawn(options, function (error, result, code) {
            try {
                if (error === null) {
                    var err = result.stderr.replace(/^Warning: NLS unused message: (.*)$/gm, "").trim();
                    var out = result.stdout.trim();
                    out = out.replace(/^>>>>> Compil.*(.|[\r\n])*?>>>>\s*$/gm, "0");
                    out = out.replace(/^>>>>.*(.|[\r\n])*?>>>>\s*$/gm, "");

                    console.log(out);


                    if (err) {
                        console.error("\n" + err["red"]);
                    }

                    done();
                }
                else {
                    throw new Error(error);
                }
            }
            catch (ex) {
                done(ex);
            }
        });

    });

};

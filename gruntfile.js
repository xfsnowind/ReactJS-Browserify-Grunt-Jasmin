/*global module, require */

module.exports = function(grunt) {
    // Load libs
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsxhint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-react');

    // Setup
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            test: {
                src: ['test/spec/*.jsx'],
                dest: 'test/test.js'
            },
            src: {
                src: ['src/jsx/*.jsx', 'src/js/*.js'],
                dest: 'www/main.js'
            }
        },

        uglify: {
            main: {
                files: {
                    'deploy/main.js': ['www/main.js']
                }
            }
        },

        copy: {
            images: {
                cwd: 'src/images',
                expand: true,
                //png, jpg and gif files are handled by imagemin
                src: ['**/*', '!**/*.ico', '**/*.png', '**/*.gif', '**/*.jpg' ],
                dest: 'www/images'
            },
            html: {
                src: "index.html",
                dest: "www/"
            }
        },

        sass: {
            dist: {
                options: {
                    includepaths: ['src/css/']
                },
                files: {
                    'www/main.css': 'src/css/style.scss'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'deploy/main.css': ['src/css/*.css', 'build/*.css']
                }
            }
        },

        jshint: {
            files: [
                'src/jsx/*.jsx',
                "src/js/*.js"
            ],
            options: {
                globals: {
                    console: true
                },
                undef: true,
            }
        },

        clean: {
            build: ['www/', 'deploy', 'build/', 'test/**/*.js']
        },

        watch: {
            //install browser extension to get watch to trigger automatic
            //browser reload: http://goo.gl/o7sbk
            options: {
                livereload: true
            },
            jsx: {
                files: ['src/jsx/*.jsx', 'src/js/*.js'],
                tasks: ['browserify:src'],
                options: {
                    atbegin: true
                }
            },
            stylesheets: {
                files: ['src/css/*.scss'],
                tasks: ['css']
            },
            tests: {
                files: ['test/spec/*.jsx'],
                tasks: ['test']
            },
       },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'www',
                    middleware: function (connect, options) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            // Include the proxy first
                            proxy,
                            // Serve static files.
                            connect.static(options.base),
                            // Make empty directories browsable.
                            connect.directory(options.base)
                        ];
                    }
                }
            },
            // proxies: [
            //     //proxy urls starting with /to localhost to prevent
            //     //same-origin problems when talking to server.
            //     {
            //         context: [config.restServerURL],
            //         host: config.debugRealServerHost,
            //         port: config.debugRealServerPort,
            //         https: false,
            //         changeOrigin: false,
            //         xforward: false
            //     }
            // ]
        },

        jasmine: {
            test: {
                src: 'deploy/main.js',
                options: {
                    specs: ['test/test.js'],
                    helpers: ['node_modules/jasmine-ajax/lib/mock-ajax.js']
                }
            }
        },
    });


    // Tasks
    /* jshint scripturl: true */
    grunt.registerTask('test', [
        'browserify:test',
        'jasmine',
    ]);

    grunt.registerTask('check', [
        'jshint',
    ]);

    grunt.registerTask("css", [
        'sass',
        'cssmin'
    ]);

    grunt.registerTask('build', [
        'check',
        'browserify:src',
        'css',
    ]);

    grunt.registerTask('server', [
        // 'configureProxies',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('ci', [
        'clean',
        'build',
        'uglify',
        'test'
    ]);

    grunt.registerTask('default', [
        'build',
        'copy:images',
        'copy:html',
        // 'test',
        'server'
    ]);
};


module.exports = function(grunt) {
    'use strict';
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        themeRoots:{
            root : './wp-content/themes/',
            Main: '<%= themeRoots.root %>bones/'
        },

        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['<%= themeRoots.Main %>library/scss/**/*.{scss,sass}'],
                tasks: ['compass:devMain']
            },
            js: {
                files: '<%= jshint.Main %>',
                tasks: ['jshint:Main', 'uglify:Main']
            },
            livereload: {
                files: ['*.html', '*.php', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}', '<%= jshint.all %>']
            }
        },

        compass: {
            devMain: {
                options: {
                    basePath: '<%= themeRoots.Main %>',
                    config: 'dev-config.rb'
                }
            },
            prodMain:{
                options:{
                    basePath: '<%= themeRoots.Main %>',
                    config: 'prod-config.rb',
                    force:true
                }
            }
        },

        jshint: {
            options: {
                "globals": {
                    "jQuery": true,
                    "module": true,
                    "require":true
                },
                "force": true
            },
            common: [
                'Gruntfile.js'
            ],
            Main: [
                '<%= jshint.common %>',
                '<%= themeRoots.Main %>library/js/**/*.js'
            ],
            all: [
                '<%= jshint.common %>',
                '<%= jshint.Main %>'
            ]
        },

        uglify: {
            Main: {
                options: {
                    sourceMap: '<%= themeRoots.Main %>library/js/source-map.js'
                },
                files: {
                    '<%= themeRoots.Main %>assets/js/scripts.min.js': [
                        '<%= themeRoots.Main %>library/js/scripts.js'
                    ]
                }
            }
        },

        rsync: {
            options:{
                src: "./wp-content/themes",
                exclude: [
                    '.sass-cache',
                    '.DS_Store',
                    'library/js',
                    '.git*',
                    'Gruntfile.js',
                    'library/scss'
                ]
            },
            stage: {
                options:{
                    dest: "~/domains/amiavr.devgs.com/public_html/wp-content/themes",
                    host: "",
                    recursive: true,
                    syncDest: true,
                    deleteAll: false
                }

            },
            productions: {
                options:{
                    dest: "~/domains/amiavr.devgs.com/public_html/wp-content/themes",
                    host: "",
                    recursive: true,
                    syncDest: true,
                    deleteAll: false
                }

            }
        }
    });

    // register task
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('compass:dev', ['compass:devMain']);
    grunt.registerTask('compass:prod', ['compass:prodMain']);
    grunt.registerTask('uglify:compile', ['uglify:Main']);
    grunt.registerTask('stage', ['compass:prod','uglify:compile', 'rsync:stage']);
    grunt.registerTask('deploy', ['compass:prod','uglify:compile', 'rsync:production']);

};
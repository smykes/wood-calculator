module.exports = function(grunt) {
    grunt.initConfig({
        dom_munger: {
            your_target: {
                options: {
                    remove: ['link', 'script'],
                    append: [{
                        selector: 'head',
                        html: '<link rel="stylesheet" href="css/vendor/skeleton.min.css">'
                    }, {
                        selector: 'head',
                        html: '<link rel="stylesheet" href="css/vendor/jquery.min.css">'
                    }, {
                        selector: 'head',
                        html: '<link rel="stylesheet" href="css/css/main.min.css">'
                    }, {
                        selector: 'head',
                        html: '<script src="js/vendor/modernizr.js"></script>'
                    }, {
                        selector: 'body',
                        html: '<script src="js/vendor/jquery.js"></script>'
                    }, {
                        selector: 'body',
                        html: '<script src="js/vendor/jquery.nouislider.all.min.js"></script>'
                    }, {
                        selector: 'body',
                        html: '<script src="js/vendor/knockout.js"></script>'
                    }, {
                        selector: 'body',
                        html: '<script src="js/vendor/knockout.validation.js"></script>'
                    }, {
                        selector: 'body',
                        html: '<script src="js/main.js"></script>'
                    }, ]
                },
                src: 'index.html',
                dest: 'dist/index.html',
            }
        },
        bower: {
            prod: {
                dest: 'dist/',
                js_dest: 'dist/js/vendor',
                css_dest: 'dist/styles/vendor',
                options: {
                    keepExpandedHierarchy: false,
                    stripGlobBase: true
                }
            },
        },
        copy: {
            style: {
                src: ['css/main.css', 'styles/vendor/jquery.nouislider.min', 'styles/vendor/jquery.nouislider.pips.min'],
                dest: 'dist/styles/',
                flatten: true
            },
            script: {
                src: 'js/main.js',
                dest: 'dist/js/main.js',
                flatten: true
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/styles',
                    src: ['**/*.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        remove: {
            default_options: {
                trace: true,
                dirList: ['dist/styles']
            }
        }
    });
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower');
    grunt.registerTask('build', ['bower', 'copy', 'cssmin', 'dom_munger', 'remove']);
};
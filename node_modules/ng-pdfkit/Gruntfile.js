module.exports = function (grunt) {

    grunt.initConfig({
        'uglify': {
            build: {
                files: {
                    'build/ng-pdfkit.js': ['libs/**/*.js', 'source/**/*.js']
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', [
        //'concat',
        'uglify'
    ]);

}
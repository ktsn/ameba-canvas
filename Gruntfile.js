module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        reporters: 'dots'
      }
    },
    typescript: {
      base: {
        src: ['ts/**/*.ts'],
        dest: 'js/ameba-canvas.js',
        options: {
          target: 'es5',
          basePath: '/'
        }
      }
    },
    watch: {
      scripts: {
        files: ['test/**/*.js', 'ts/**/*.ts'],
        tasks: ['typescript:base', 'karma:unit']
      }
    }
  });

  grunt.registerTask('build', ['typescript:base']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('default', ['watch']);
};

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-typescript');

  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.conf.js'
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
      },
      watch: {
        src: ['ts/**/*.ts'],
        dest: 'js/ameba-canvas.js',
        options: {
          target: 'es5',
          basePath: '/',
          watch: true
        }
      }
    }
  });

  grunt.registerTask('build', ['typescript:base']);
  grunt.registerTask('watch', ['typescript:watch']);
};

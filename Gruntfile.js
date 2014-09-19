module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n'
			},
			main: {
				files: {
					'./src/ngNotificationsBar.min.js': ['./src/ngNotificationsBar.js']
				}
			}
		},
		jshint: {
			options: {
				ignores: ['./src/ngNotificationsBar.min.js']
			},
			files: ['*.js']
		},
		compass: {
			dev: {
				options: {
					sassDir: 'sass',
					cssDir: 'css',
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n'
			},
			minify:{
				files: {
					'css/ngNotificationsBar.min.css': ['css/ngNotificationsBar.css']
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('build', ['uglify', 'compass', 'cssmin']);
	grunt.registerTask('css', ['compass']);
};

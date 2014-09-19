module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n'
			},
			main: {
				files: {
					'./dist/ngNotificationsBar.min.js': ['./src/ngNotificationsBar.js']
				}
			}
		},
		jshint: {
			files: ['src/*.js']
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
					'dist/ngNotificationsBar.min.css': ['css/ngNotificationsBar.css']
				}
			}
		},
		watch: {
			src: {
				files: 'src/*.js',
				tasks: ['jshint', 'uglify']
			},
			sass: {
				files: 'sass/*.scss',
				tasks: ['compass', 'cssmin']
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('sass', ['compass', 'cssmin']);
	grunt.registerTask('build', ['jshint', 'uglify', 'compass', 'cssmin']);
};

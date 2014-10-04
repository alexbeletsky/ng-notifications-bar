module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n',
				mangle: false
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
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: 'sass/*.scss',
				tasks: ['compass', 'cssmin'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['example/**/*.html', 'example/**/*.css'],
				options: {
					livereload: true
				}
			}
		},
		connect: {
			example: {
				options: {
					port: 9002,
					open: {
						target: 'http://localhost:9002/example/index.html'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('sass', ['compass', 'cssmin']);
	grunt.registerTask('build', ['uglify', 'compass', 'cssmin']);
	grunt.registerTask('start:example', ['connect', 'watch']);

	grunt.registerTask('default', ['build']);

};

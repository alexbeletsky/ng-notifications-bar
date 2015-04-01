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
		},
		shell: {
			deploy: {
				command: 'git push origin `git subtree split --prefix example master`:gh-pages --force'
			}
		},
		wiredep: {
			task: {
				src: [
					'example/*.html',
				]
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, src: ['bower_components/**'], dest: 'example/'},
					{expand: true, src: ['dist/**'], dest: 'example/'},
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('sass', ['compass', 'cssmin']);
	grunt.registerTask('build', ['uglify', 'compass', 'cssmin', 'wiredep', 'copy']);
	grunt.registerTask('deploy', ['build', 'shell']);

	grunt.registerTask('start:example', ['build', 'connect', 'watch']);

	grunt.registerTask('default', ['build']);

};


module.exports = function(grunt) {
	
	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	grunt.initConfig({
	    
		pkg: grunt.file.readJSON('package.json'),


	    copy: { 
	    	build: { 
	    		cwd: 'src/',
	    		src: [
	    			'**', 			// Grab Everything 
	    			'!**/less/**', 	// Skip the LESS Source Folder
	    			'!**/js/**' 	// Skip the JS Source Folder
	    			], 
	    		dest: 'dist/', 
	    		expand: true
			}
	    }, 

	    clean: {
			build: {
				src: [ 'dist' ]
		  	},
		 	stylesheets: {
    			src: [ 'dist/css/**/*.css', '!dist/css/styles.css' ]
  			},
  			scripts: {
    			src: [ 'dist/js/**/*.js', '!dist/js/scripts.js' ]
  			},
		},

		
	    less: {
	    	build: { 
	    		options: {
					yuicompress: true
				},
				files: { 
					'dist/css/setup.css':'src/less/setup.less'
				}
	    	}
		}, 

		cssmin: {
			build: {
		    	files: {
		      		'dist/css/styles.css': [ 'dist/css/**/*.css' ]
		    	}
		  	}
		},

	    
		uglify: {
			build: {
		    	options: {
		      		mangle: false
		    	},
	    		files: {
		    		'dist/js/scripts.js': [ 
		    			'src/js/vendor/jquery/**/*.js', 	// Do JQUERY FIRST
		    			'src/js/vendor/**/*.js', 			// Then do all the other vendor js files
		    			'src/js/app/**/*.js' 				// Then add all of the app js file
		    			]
		    	}
		  	}
		},

		watch: {
			stylesheets: {
				files: 'src/less/**/*.less',
				tasks: [ 'stylesheets' ]
			},
			scripts: {
				files: 'src/js/**/*.js',
				tasks: [ 'scripts' ]
			},
			copy: {
				files: [ 
					'src/**', 
					'!src/less/**/*.less', 	// Don't copy LESS Files 
					'!src/js/**/*.js'		// Don't copy JS Files 
					],
				tasks: [ 'copy' ]
			}, 
			options: {
				livereload: true
			}
		},


		// The connect task is used to serve static files with a local server.
		connect: {
		  preview: {
		    options: {
		      // The server's port, and the folder to serve from:
		      // Ex: 'localhost:9000' would serve up 'client/index.html'
		      port: 9000,
		      base:'dist', 
		      open: true, 
		      livereload: true      
		    }
		  }
		}

  	});

	// Task to deal with stylesheets 
  	grunt.registerTask('scripts', [
  		'uglify',
  		'clean:scripts'
  		]);

  	// Task to deal with scripts 
  	grunt.registerTask('stylesheets', [
  		'less', 
  		'cssmin',
  		'clean:stylesheets'
  		]);


	// Build Task 
  	grunt.registerTask('build', [
  		'clean:build', 
  		'copy', 
  		'stylesheets', 
  		'scripts'
  		]);

		
  	// Default task(s).
  	grunt.registerTask('default', [
  		'build', 
  		'connect', 
  		'watch'
  		]);

};
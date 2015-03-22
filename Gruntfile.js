module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
  			build: {
    			src: ['dist/**/*']
  			}
		},
		htmlmin: {
		    dist: {
		      	options: {
		        	removeComments: true,
		        	collapseWhitespace: true
		      	},
		      	files: {
		        	'dist/index.html': 'src/index.html',
		        }
		    },
		},
		less: {
	      	development: {
	        	options: {
	          		compress: true,
	          		yuicompress: true,
	          		optimization: 2
	        	},
	        	files: {
	          		'dist/stylesheets/style.css': 'src/stylesheets/style.less'
	        	}
	      	}
    	},
    	uglify: {
    		options: {
      			mangle: false
    		},
   	 		my_target: {
     	 		files: {
        			'dist/javascripts/app.js': ['src/javascripts/app.js', 'src/javascripts/contact-form.js']
        		}
    		}
  		},
  		copy: {
      		foo: {
        		files: [{
            		expand: true,
            		dest: 'dist',
            		cwd: 'src',
            		src: [
              			'fonts/**/*.*',
              			'stylesheets/**/*.css',
              			'javascripts/vendor/*.js',
              			'images/**/*.*',
                        'mail.php',
            		]
          		}]
      		}
      	},
      	'sftp-deploy': {
  			build: {
    			auth: {
      				host: 'matheusgodinho.co.uk',
      				port: 22,
      				authKey: 'matheusgodinho.co.uk'
    			},
                cache: false,
    			src: 'dist',
    			dest: '/var/www',
                serverSep: '/',
    			concurrency: 4,
    			progress: true
  			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sftp-deploy');
	grunt.registerTask('dist',['clean', 'htmlmin', 'less', 'uglify', 'copy']);
	grunt.registerTask('deploy',['sftp-deploy']);
	grunt.registerTask('default',['dist']);
}
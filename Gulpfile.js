var gulp		= require('gulp'),
    path		= require('path'),
    jspm		= require('jspm'),
    htmlreplace	= require('gulp-html-replace')

var root = 'client';

// helper method to resolveToApp paths
var resolveTo = function(resolvePath) {
	return function(glob) {
		glob = glob || '';
		return path.join(root, resolvePath, glob);
	}
};

var resolveToApp = resolveTo('app'); // app/{glob}

// map of all our paths
var paths = {
	js: resolveToApp('**/*.js'),
	dist: path.join(__dirname, '../api/Product/www/')
};

gulp.task('build', function() {
	var dist = path.join(paths.dist + 'app.js');
	// Use JSPM to bundle our app
	return jspm.bundleSFX(resolveToApp('app'), dist, {
		mangle: false,
		minify: false
	})
		.then(function() {
			// Inject minified script into index
		  return gulp.src('client/index.html')
				.pipe(htmlreplace({
					'js': 'app.js'
				}))
				.pipe(gulp.dest(paths.dist));
		});
});


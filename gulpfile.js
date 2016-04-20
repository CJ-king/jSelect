var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require("gulp-concat"),
	minifyCss = require("gulp-minify-css"),
	rename = require('gulp-rename'),
	header = require('gulp-header'),
	banner = ['/**',
	  ' * Created on : <%= date %>',
	  ' * Author     : <%= name %>',
	  ' */',
	  ''].join('\n');
/*合并压缩js*/
gulp.task('minjs', function() {
  gulp.src(["js/jSelect.js"])
    .pipe(uglify())
    .pipe(rename({basename: "jSelect",
			    //prefix: new Date().getTime()+"-",
			    suffix: ".min",
			    extname: ".js"}))
    .pipe(header(banner, { name : 'jinchangjiang',date:(new Date()).toString()}))
    .pipe(gulp.dest('dist/'));
});



gulp.task('all',['minjs']);
gulp.task('default', function() {
	gulp.watch(['js/*.js','css/*.css'], ['minjs','mincss']);
});

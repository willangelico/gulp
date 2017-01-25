'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var liveserver = require('gulp-live-server');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var less = require('gulp-less');
var LessPluginCleanCss = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCss({ advanced: true });


gulp.task('default', ['watch','server']);

gulp.task('sass', function () {
 return gulp.src('assets/src/sass/*.scss')
 	.pipe(concat('style.min.css')) // concat
   	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))   
   	.pipe(gulp.dest('assets/css'));
});

gulp.task('js', function () {
 return gulp.src('assets/src/js/**/*.js')
 	.pipe(concat('script.min.js')) // concat
   	.pipe(uglify())   
   	.pipe(gulp.dest('assets/js'));
});

gulp.task('img', function () {
	return gulp.src('assets/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img'));
});

gulp.task('html', function() {
  return gulp.src('_html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function(){
	gulp.watch('assets/src/sass/*.scss',['sass']);
	gulp.watch('assets/src/js/**/*.js',['js']);
	gulp.watch('assets/src/img/*',['img']);
	gulp.watch('_html/*.html',['html']);
	gulp.watch('assets/src/less/**/*.less',['less']);
});

gulp.task('server', function(){
	var server = liveserver.static('./',8000);
	server.start();
	gulp.watch('assets/css/**/*.css', function(f){
		liveserver.notify.apply(server,[f])
	});
	gulp.watch('assets/js/**/*.js', function(f){
		liveserver.notify.apply(server,[f])
	});
	gulp.watch('assets/img/', function(f){
		liveserver.notify.apply(server,[f])
	});
	gulp.watch('./*.html', function(f){
		liveserver.notify.apply(server,[f])
	});
});

gulp.task('lint', function() {
  return gulp.src('assets/src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('less', function(){
	return gulp.src('assets/src/less/**/*.less')
		.pipe(concat('styleLess.min.css')) // concat
		.pipe(less({
			plugins: [cleancss]
		}))
		.pipe(gulp.dest('assets/css'));
});
 

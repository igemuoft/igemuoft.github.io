'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')


// BROWSERSYNC TASKS
// compile sass to src/css
gulp.task('sass', function() {
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
})

// serving with browserSync
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: 'src',
	});
	
	gulp.watch(['src/scss/*.scss'], ['sass']);
	gulp.watch(['src/*.html']).on('change', browserSync.reload);
});


// BUILD TASKS
// move all html to dist
gulp.task('copyHTML', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
})

// move all images to dist
gulp.task('copyImages', function() {
	gulp.src('src/img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('copyCSS', function() {
	gulp.src('src/css/*.css')
		.pipe(gulp.dest('dist/css'));
})

gulp.task('build', ['copyHTML', 'copyImages', 'copyCSS']);

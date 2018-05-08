'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var ugilfy = require('gulp-uglify');
// BROWSERSYNC TASKS

// handlebars
gulp.task('handlebars', function () {
  var templateData = {
  },
  options = {
  	ignorePartials: true,
    partials : {
    },
    batch : ['./src/handlebars/partials'],
    helpers : {
    }
  }

  return gulp.src('src/handlebars/*.handlebars')
    .pipe(handlebars(templateData, options))
		.pipe(rename(function(path) {
			path.extname = '.html'
		}))
    .pipe(gulp.dest('src'))
		.pipe(browserSync.stream());
});

// compile sass to src/css
gulp.task('sass', function() {
	gulp.src('src/scss/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('src'))
		.pipe(browserSync.stream());
})

// concat and ugilfy scripts
gulp.task('scripts', function() {
	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(ugilfy())
		.pipe(gulp.dest('src'))
		.pipe(browserSync.stream());
})

// serving with browserSync
gulp.task('default', ['handlebars', 'sass', 'scripts'], function() {
	browserSync.init({
		server: 'src',
	});

	gulp.watch(['src/handlebars/**'], ['handlebars']);
	gulp.watch(['src/scss/**'], ['sass']);
	gulp.watch(['src/js/*.js'], ['scripts']);
	gulp.watch(['src/img/**']), browserSync.reload;
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
	gulp.src('src/*.css')
		.pipe(gulp.dest('dist'));
})

gulp.task('build', ['copyHTML', 'copyImages', 'copyCSS']);

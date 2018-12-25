var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    cleanCSS  = require('gulp-clean-css'),
    uglify     = require('gulp-uglify'),
    rename     = require("gulp-rename"),
		sass       = require('gulp-sass'),
		gulpHtmlVersion = require('gulp-html-version');

gulp.task('sass', function(){
	gulp.src('resource/sass/main.sass') /*來源檔案*/
	.pipe(sass()) /*編譯sass成css*/
	.pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('css/')); /*要輸出的檔案,讓它輸出到source文件夾的上層*/
});
	
gulp.task('merge-js', function (){
    gulp.src('resource/scripts/**/*.js')
      .pipe(concat('main.js'))
	    //.pipe(gulp.dest('js/'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('js/'));
});

gulp.task('copy',  function() {
  gulp.src('bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('vendor/jquery/'))
  gulp.src('bower_components/jquery-mousewheel/jquery.mousewheel.min.js').pipe(gulp.dest('vendor/jquery-mousewheel/'))
  gulp.src('bower_components/gasparesganga-jquery-message-box/dist/messagebox.min.css').pipe(gulp.dest('vendor/jquery-messagebox/'))
  gulp.src('bower_components/gasparesganga-jquery-message-box/dist/messagebox.min.js').pipe(gulp.dest('vendor/jquery-messagebox/'))
});

 
gulp.task('version', function() {
    return gulp.src('resource/*.html')
        .pipe(gulpHtmlVersion({
					paramType: 'timestamp'
				}))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['copy', 'merge-js', 'sass','version']); /*執行gulp時一併執行sass cp 和watch的指令 */
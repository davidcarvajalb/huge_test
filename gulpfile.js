var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./public",
        port: 3010
    });

    gulp.watch("public/scss/*.scss", ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public/scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/styles"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

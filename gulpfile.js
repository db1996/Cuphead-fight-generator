var gulp = require('gulp'),
    gutil = require('gulp-util');
sass = require('gulp-sass');
uglify = require('gulp-uglify-es').default;
concat = require('gulp-concat');
sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var devip = require('dev-ip');
var wait = require('gulp-wait');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

var production = !!gutil.env.production;
var jsmin = !!gutil.env.jsmin;

var proxyStr = 'http://localhost:8080/all/randomnumber/';

// json object to specify folders and files it watches
var srcs = {
        scss: 'scss/*.scss',
        js: 'js-build/**/*.js'
    },
    dests = {
        css: 'css/',
        cssmin: 'css/',
        js: 'js/'
    },
    buildwatch = {
        scss: 'scss/**/*.scss',
        js: 'js-build/**/*.js'
    },
    watchs = {
        scss: 'css/**/*.css',
        js: 'js/**/*.js',
        php: ['**/*.php', '**/*.html'],
        images: ['img/*.png', 'img/*.gif', 'img/*.jpg', 'img/*.svg']
    },
    filenames = {
        js: 'main.js'
    },
    autoprefixerOptions = {
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    };

gulp.task('build-css', function() {
    return gulp
        .src(srcs.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dests.css))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(production === true ? rename({ extname: '.min.css' }) : gutil.noop())
        .pipe(production === true ? cleanCSS({ level: 2 }) : gutil.noop())
        .pipe(gulp.dest(dests.cssmin))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('build-css-timeout', function() {
    return gulp
        .src(srcs.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(wait(2500))
        .pipe(gulp.dest(dests.css))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(production === true ? rename({ extname: '.min.css' }) : gutil.noop())
        .pipe(production === true ? cleanCSS({ level: 2 }) : gutil.noop())
        .pipe(gulp.dest(dests.cssmin))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('reload-img', function() {
    return gulp.src(watchs.images).pipe(browserSync.reload({ stream: true }));
});

// Build JS
gulp.task('build-js', function() {
    return gulp
        .src(srcs.js)
        .pipe(jsmin === true ? gutil.noop() : sourcemaps.init())
        .pipe(concat(filenames.js))
        .pipe(jsmin === true ? uglify().on('error', gutil.log) : gutil.noop())
        .pipe(jsmin === true ? gutil.noop() : sourcemaps.write())
        .pipe(gulp.dest(dests.js))
        .pipe(browserSync.reload({ stream: true }));
});
// Handle errors
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('watch', function() {
    browserSync.init({
        // port: 3000,
        proxy: proxyStr,
        online: true,
        // notify: false,
        host: devip()
    });
    gulp.watch(buildwatch.scss, ['build-css']);
    gulp.watch(buildwatch.js, ['build-js']);
    gulp.watch(watchs.images, ['reload-img']);
    gulp.watch(watchs.php).on('change', browserSync.reload);
    gulp.watch(watchs.php, ['build-css-timeout']);
});

gulp.task('default', ['watch'], browserSync.reload);

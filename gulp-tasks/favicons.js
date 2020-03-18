'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function favicons(options) {
    return function () {
        return gulp.src(options.src)
            .pipe(
                $.favicons({
                    icons: {
                        android: false,
                        appleIcon: true,
                        appleStartup: false,
                        coast: false,
                        favicons: true,
                        firefox: false,
                        windows: false,
                        yandex: false
                    }
                })
            )
            .pipe(gulp.dest(options.dist))
    }
};
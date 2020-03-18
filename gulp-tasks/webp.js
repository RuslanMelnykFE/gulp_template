'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const imageminWebp = require('imagemin-webp');
const yargs = require('yargs');

const argv = yargs.argv;
const production = !!argv.production;

module.exports = function webp(options) {
    return function () {
        return gulp.src(options.src)
            .pipe($.webp($.if(production, imageminWebp({
                lossless: true,
                quality: 100,
                alphaQuality: 100
            }))))
            .pipe(gulp.dest(options.dist))
            .pipe($.debug({ title: 'Images webp' }))
    }
};
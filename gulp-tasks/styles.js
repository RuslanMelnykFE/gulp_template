'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const sass = require('gulp-sass');
const rev = require('gulp-rev');

const combine = require('stream-combiner2').obj; // объединяет несклько потоков в один
const yargs = require('yargs');

const argv = yargs.argv;
const production = !!argv.production;


sass.compiler = require('node-sass');

module.exports = function styles(options) {
    return function () {
        return combine(
            gulp.src(options.src),
            $.if(!production, $.sourcemaps.init()),
            $.sass({
                import: process.cwd + '/tmp/styles/sprite'
            }),
            $.cached('styles'),
            $.autoprefixer({
                cascade: false,
                grid: true
            }),
            $.remember('styles'),
            $.if(!production, $.sourcemaps.write()),
            $.if(production, combine($.cssnano(), $.rev(), $.rename({
                suffix: '.min'
            }))),
            gulp.dest(options.dist),
            $.if(production, combine(
                rev.manifest('css.json'),
                gulp.dest('manifest'))),
            $.debug({ title: 'CSS files' })
        ).on('error', $.notify.onError());
    };
};
'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const combine = require('stream-combiner2').obj;
const yargs = require('yargs');

const argv = yargs.argv;
const production = !!argv.production;

const webpackConfig = require('../webpack.config.js');
webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.devtool = production ? false : 'source-map';

module.exports = function scripts(options) {
    return () => {
        return gulp.src(options.src)
            .pipe(webpackStream(webpackConfig), webpack)
            .pipe($.if(production, combine($.uglify(), $.rename({
                suffix: '.min'
            }))))
            .pipe(gulp.dest(options.dist))
            .pipe($.debug({ title: 'JS files' }));
    };
};
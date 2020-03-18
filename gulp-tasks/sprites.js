'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');

const yargs = require('yargs');

const argv = yargs.argv;
const production = !!argv.production;

module.exports = function sprites(options) {
    return function () {
        return gulp.src(options.src)
            .pipe($.cheerio({
                run: ($) => {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                    $('[width]').removeAttr('width');
                    $('[height]').removeAttr('height');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.replace('&gt;', '>'))
            .pipe(svgSprite({
                mode: {
                    css: {
                        dest: '.',
                        bust: production,
                        sprite: 'sprite.svg',
                        layotu: 'vertical',
                        prefix: '$',
                        dimensions: true,
                        render: {
                            scss: {
                                dest: 'sprite.scss'
                            }
                        }
                    }
                }
            }))
            .pipe($.if('*.scss', gulp.dest('tmp/sprites'), gulp.dest(options.dist)))
            .pipe($.debug({ title: 'styles.svg' }));
    }
}
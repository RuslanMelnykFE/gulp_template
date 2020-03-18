'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');

const yargs = require('yargs');

const argv = yargs.argv;
const production = !!argv.production;

module.exports = function images(options) {
    return function () {
        return gulp.src(options.src, { since: gulp.lastRun('images') })
            .pipe($.if(production,
                imagemin([
                    imageminGiflossy({
                        optimizationLevel: 3,
                        optimize: 3,
                        lossy: 2
                    }),
                    imageminPngquant({
                        speed: 5,
                        quality: [0.6, 0.8]
                    }),
                    imageminZopfli({
                        more: true
                    }),
                    imageminMozjpeg({
                        progressive: true,
                        quality: 90
                    }),
                    imagemin.svgo({
                        plugins: [
                            { removeViewBox: false },
                            { removeUnusedNS: false },
                            { removeUselessStrokeAndFill: false },
                            { cleanupIDs: false },
                            { removeComments: true },
                            { removeEmptyAttrs: true },
                            { removeEmptyText: true },
                            { collapseGroups: true }
                        ]
                    })
                ])
            ))
            .pipe(gulp.dest(options.dist))
            .pipe($.debug({ title: 'Images' }));
    };
};
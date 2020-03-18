'use strict'

const gulp = require('gulp');

module.exports = function watch(options) {
    return function () {
        gulp.watch([options.styles[0], options.styles[1], 'tmp/sprites/sprite.scss'], gulp.series('styles'))
            .on('unlink', function (filepath) {
                remember.forget(styles, path.resolve(filepath));
                delete cached.caches.styles[path.resolve(filepath)];
            });
        gulp.watch(options.views, gulp.series('views'));
        gulp.watch(options.images, gulp.series('images'));
        gulp.watch(options.sprites, gulp.series('sprites:svg'));
        gulp.watch(options.webp, gulp.series('webp'));
        gulp.watch(options.fonts, gulp.series('fonts'));
        gulp.watch(options.scripts, gulp.parallel('scripts'));
    };
};
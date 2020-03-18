'use strict';

const browserSync = require('browser-sync').create();

module.exports = function serve() {
    return function () {
        browserSync.init({
            server: 'dist',
            port: 9000,
            notify: true
        });
        browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
    };
};
'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const eslint = require('gulp-eslint');
const through2 = require('through2').obj;// создание плагинов работа с потоками объектов
const combine = require('stream-combiner2').obj; // объединяет несклько потоков в один
const fs = require('fs');

module.exports = function lint(options) {
    return function () {
        let eslintResults = {};
        let cacheFilePath = process.cwd() + '/tmp/lintCache.json';

        try {
            eslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
        } catch (e) { }

        return gulp.src(options.src, { read: false })
            .pipe($.debug({ title: 'src' }))
            .pipe($.if(
                (file) => {
                    return eslintResults[file.path] && eslintResults[file.path].mtime == file.stat.mtime.toJSON();
                },
                through2((file, enc, callback) => {
                    file.eslint = eslintResults[file.path].eslint;
                    callback(null, file);
                }),
                combine(
                    through2((file, enc, callback) => {
                        file.contents = fs.readFileSync(file.path);
                        callback(null, file);
                    }),
                    eslint(),
                    $.debug({ title: 'eslint' }),
                    through2((file, enc, callback) => {
                        eslintResults[file.path] = {
                            eslint: file.eslint,
                            mtime: file.stat.mtime
                        };
                        callback(null, file);
                    })
                )
            ))
            .pipe(eslint.format())
            .on('end', () => {
                fs.writeFileSync(cacheFilePath, JSON.stringify(eslintResults));
            });
        // .pipe(eslint.failAfterError())

    };
};
'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const pugLinter = require('gulp-pug-linter');
const htmlValidator = require('gulp-w3c-html-validator');
const bemValidator = require('gulp-html-bem-validator');
const revReplace = require('gulp-rev-replace');
const yargs = require('yargs');

const argv = yargs.argv;
const production = !!argv.production;

module.exports = function views(options) {
    return function () {
        return gulp.src(options.src)
            .pipe($.plumber())
            .pipe(pugLinter({ reporter: 'default' }))
            .pipe($.pug())
            .pipe(htmlValidator())
            .pipe(bemValidator())
            .pipe($.if(production,
                revReplace({
                    manifest: gulp.src('manifest/css.json', { allowEmpty: true }),
                })
            ))
            .pipe($.if(production, $.replace('.js', '.min.js')))
            .pipe(gulp.dest(options.dist))
            .pipe($.debug({ title: 'Pug files' }))
    }
}

// gulp.task('assets', function () {
//     return gulp.src('src/assets/**/*.html', { since: gulp.lastRun('assets') })
//         .pipe($.newer('stc'))
//         .pipe($.if(production,
//             revReplace({
//                 manifest: gulp.src('manifest/css.json', { allowEmpty: true }),
//             })
//         ))
//         .pipe($.if(production, replace('.js', '.min.js')))
//         .pipe(debug({ title: 'Assets file' }))
//         .pipe(gulp.dest('dist'));
// });
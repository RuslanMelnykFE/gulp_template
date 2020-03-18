'use strict';

const gulp = require('gulp');

const paths = {
    src: {
        views: [
            './src/views/index.pug',
            './src/views/pages/*.pug'
        ],
        styles: 'src/styles/main.{scss,sass}',
        scripts: 'src/js/index.js',
        images: 'src/assets/images/**/*.{png,jpg,jpeg,gif,tiff,webp}',
        sprites: 'src/assets/images/svg/**/*.svg',
        favicons: 'src/assets/images/favicons/*.{png,jpg,jpeg,gif,webp}',
        fonts: 'src/assets/fonts/**/*.{woff,woff2,ttf,otf,eot}',
        webp: [
            'src/img/**/*.{jpg,jpeg,png,tiff,webp}',
            '!src/img/favicon/*.{jpg,jpeg,png,gif,webp}'
        ]
    },
    watch: {
        views: ['src/components/**/*.pug', 'src/views/**/*.pug'],
        styles: ['src/styles/**/*.{scss,sass}', 'src/components/**/*.{scss,sass}'],
        scripts: ['src/components/**/*.js', 'src/js/**/*.js'],
        images: 'src/assets/images/**/*.{png,jpg,jpeg,gif,webp}',
        sprites: 'src/assets/images/svg/**/*.svg',
        favicons: 'src/assets/images/favicons/*.{png,jpg,jpeg,gif,tiff}',
        fonts: 'src/assets/fonts/**/*.{woff,woff2,ttf,otf,eot}',
        webp: [
            'src/img/**/*.{jpg,jpeg,png,tiff,webp}',
            '!src/img/favicon/*.{jpg,jpeg,png,gif,webp}'
        ]
    },
    dist: {
        views: 'dist',
        styles: 'dist/style',
        scripts: 'dist/js',
        images: 'dist/img',
        sprites: 'dist/img/svg',
        favicons: 'dist/img/favicons',
        fonts: 'dist/fonts'
    }
};

//=================== ленивое подключение задач ===================
const lazyRequireTask = (taskName, path, options) => {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, (callback) => {
        let task = require(path).call(this, options);
        return task(callback);
    });
};

//==================== task views =================================
lazyRequireTask('views', './gulp-tasks/views', {
    src: paths.src.views,
    dist: paths.dist.views
});

//==================== task styles =================================
lazyRequireTask('styles', './gulp-tasks/styles', {
    src: paths.src.styles,
    dist: paths.dist.styles
});

//==================== task scripts =================================
lazyRequireTask('scripts', './gulp-tasks/scripts', {
    src: paths.src.scripts,
    dist: paths.dist.scripts
});

//==================== task images =================================
lazyRequireTask('images', './gulp-tasks/images', {
    src: paths.src.images,
    dist: paths.dist.images
});

//==================== task sprites =================================
lazyRequireTask('sprites:svg', './gulp-tasks/sprites', {
    src: paths.src.sprites,
    dist: paths.dist.sprites
});

//==================== task favicons =================================
lazyRequireTask('favicons', './gulp-tasks/favicons', {
    src: paths.src.favicons,
    dist: paths.dist.favicons
});

//==================== task fonts =================================
lazyRequireTask('fonts', './gulp-tasks/fonts', {
    src: paths.src.fonts,
    dist: paths.dist.fonts
});

//==================== task webp =================================
lazyRequireTask('webp', './gulp-tasks/webp', {
    src: paths.src.webp,
    dist: paths.dist.images
});

//==================== task lint =================================
lazyRequireTask('lint', './gulp-tasks/lint', { src: paths.src.sprites });

//==================== task watch =================================
lazyRequireTask('watch', './gulp-tasks/watch', paths.watch);

//==================== task clean =================================
lazyRequireTask('clean', './gulp-tasks/clean');

//==================== task serve =================================
lazyRequireTask('serve', './gulp-tasks/serve');

const build = gulp.series('clean',
    gulp.parallel('images', 'sprites:svg', 'webp', 'favicons', 'styles', 'views', 'scripts'));

const dev = gulp.series(build, gulp.parallel('watch', 'serve'));

module.exports.prod = build;
module.exports.dev = dev;

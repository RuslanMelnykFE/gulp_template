'use strict'

const del = require('del');

module.exports = function clean() {
    return function () {
        return del('dist');
    }
};
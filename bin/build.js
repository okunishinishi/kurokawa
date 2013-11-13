#!/usr/bin/env node

var tek = require('tek'),
    file = tek['file'],
    hbs = tek['hbs'],
    config = require('../app.config'),
    tekHTML = require('tek-html'),
    resolve = require('path')['resolve'];


(function compileHbs(config) {
    var precompileDir = hbs.precompileDir;
    var hbsDir = config.hbsDir,
        outpath = config.hbsTemplateFile;
    precompileDir(hbsDir, outpath, function () {
        console.log('hbs precompiled to :', outpath);
    });
})(config);

(function minifyJs(config) {
    var minify = tekHTML.minify;
    var jsDir = config.jsDir;

    var libDir = resolve(jsDir, 'lib'),
        libAllJs = resolve(jsDir, 'lib.min.js');
    minify.minifyAllJS(libDir, libAllJs, function () {
        console.log('lib js minified to :', libAllJs);
    },[/jquery\.js$/,/jquery/,/handlebars/,/tek\.js$/,/tek/]);

    var vDir = resolve(jsDir, 'validation'),
        vAllJs = resolve(jsDir, 'validation.min.js');
    minify.minifyAllJS(vDir, vAllJs, function () {
        console.log('validation js minified to :', vAllJs);
    },[/^v\.js$/]);
})(config);






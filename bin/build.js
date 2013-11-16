#!/usr/bin/env node

var tek = require('tek'),
    file = tek['file'],
    hbs = tek['hbs'],
    config = require('../app.config'),
    tekHTML = require('tek-html'),
    publicDir = config.publicDir,
    JobQueue = tek['JobQueue'],
    resolve = require('path')['resolve'];


(function compileHbs(config) {
    var precompileDir = hbs.precompileDir;
    var hbsDir = config.hbsDir,
        outpath = config.hbsTemplateFile;
    precompileDir(hbsDir, outpath, function () {
        console.log('hbs precompiled to :', outpath);
    });
})(config);


(function (js_filenames) {
    var out_dir = resolve(publicDir, 'javascripts', 'lib');
    var publishQueue = new JobQueue;
    js_filenames.forEach(function (filename) {
        publishQueue.push(function (next) {
            tekHTML.publish(filename, out_dir, next);
        });
    });
    publishQueue.execute(function () {
        console.log('js publish done');
    });
})([
        'tek.js',
        'tek.view.js',
        'jquery.treeview.js',
        'one-color.js',
        'jquery.spreadsheet.js'
    ]);


(function (less_filenames) {
    var out_dir = resolve(publicDir, 'stylesheets', 'lib');
    var publishQueue = new JobQueue;
    less_filenames.forEach(function (filename) {
        publishQueue.push(function (next) {
            tekHTML.publish(filename, out_dir, next);
        });
    });
    publishQueue.execute(function () {
        console.log('less publish done');
    });
})([
        'tek-mixin.less',
        'tek-style-clean.less',
        'tek.view.less',
        'jquery.treeview.less',
        'jquery.spreadsheet.less'
    ]);


(function minifyJs(config) {
    var minify = tekHTML.minify;
    var jsDir = config.jsDir;

    var libDir = resolve(jsDir, 'lib'),
        libAllJs = resolve(jsDir, 'lib.min.js');
    minify.minifyAllJS(libDir, libAllJs, function () {
        console.log('lib js minified to :', libAllJs);
    }, [/jquery\.js$/, /jquery/, /handlebars/, /tek\.js$/, /tek/]);

    var vDir = resolve(jsDir, 'validation'),
        vAllJs = resolve(jsDir, 'validation.min.js');
    minify.minifyAllJS(vDir, vAllJs, function () {
        console.log('validation js minified to :', vAllJs);
    }, [/^v\.js$/]);
})(config);
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



var should = require('should'),
    resolve = require('path')['resolve'],
    hbs = require('../../../util/u.hbs');

var HBS_DIR = resolve(__dirname, '../../mock/hbs');
exports.precompileAllTest = function (test) {
    var outFile = resolve(__dirname, '../../work/templates.js');
    hbs.precompileAll(HBS_DIR, outFile, function () {
        test.done();
    });
};
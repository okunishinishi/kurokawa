var should = require('should'),
    tek = require('tek'),
    path = require('path'),
    resolve = path.resolve,
    util = require('../../../util/u.file');

var mockDir = resolve(__dirname, '../../mock'),
    workDir = resolve(__dirname, '../../work');

exports.cleanDatePrefixFilesTest = function (test) {
    var dirpath = resolve(workDir, 'file_clean');
    var file = tek.file;
    file.copyDir(resolve(mockDir, 'preview'), dirpath, function () {
        file.filesInDir(dirpath).should.be.lengthOf(10);
        util.cleanDatePrefixFiles(dirpath, 100, function () {
            file.filesInDir(dirpath).should.be.lengthOf(0);
            test.done();
        });
    });

};
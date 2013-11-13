/**
 * Created by okunishitaka on 11/3/13.
 */
var should = require('should'),
    path = require('path'),
    resolve = path.resolve,
    backup = require('../../../util/u.backup');

var mockDir = resolve(__dirname, '../../mock'),
    bkDir = resolve(__dirname, '../../work/backup');

exports.fileBackupTest = function (test) {
    var filepath = resolve(mockDir, 'hbs/the-world/stop-time.hbs');
    backup.fileBackup(filepath, bkDir, function (err) {
        should.not.exist(err);
        test.done();
    });
};
exports.cleanBackupDirTest = function (test) {
    backup.cleanBackupDir(2, bkDir, function (err) {
        should.not.exist(err);
        test.done();
    });
};
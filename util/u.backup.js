/**
 * backup util
 * @type {dateFormat|exports|*}
 */
var dateFormat = require('dateformat'),
    fs = require('fs'),
    tek = require('tek'),
    path = require('path'),
    resolve = path.resolve,
    basename = path.basename;

/**
 * create file backup
 * @param filepath
 * @param bk_dirpath
 * @param callback
 */
exports.fileBackup = function (filepath, bk_dirpath, callback) {
    var prefix = dateFormat(new Date, 'yyyymmdd-HHMMss');
    var bk_filepath = resolve(bk_dirpath, [prefix, basename(filepath)].join('.'));

    var r = fs.createReadStream(filepath),
        w = fs.createWriteStream(bk_filepath);
    r.on('error', function (err) {
        callback(err);
        callback = null;
    });
    w.on('error', function (err) {
        callback(err);
        callback = null;
    });
    w.on('close', function () {
        callback && callback(null, bk_filepath);
    });
    r.pipe(w);
};


/**
 * clean backup dir.
 * sort files by name and remove older ones
 * @param maxcount
 * @param bk_dirpath
 * @param callback
 */
exports.cleanBackupDir = function (maxcount, bk_dirpath, callback) {
    fs.readdir(bk_dirpath, function (err, filenames) {
        if (err) {
            callback(err);
            return;
        }
        filenames.reverse().forEach(function (filename, i) {
            if (filename.match(/^\./)) return;
            var filepath = resolve(bk_dirpath, filename);
            if (maxcount <= i) {
                if (tek.file.isDir(filepath)) {
                    tek.file.rmdirRecursive(filepath);
                } else {
                    fs.unlinkSync(filepath);
                }
            }
        });
        callback && callback();
    });
};

exports.mongodump = function (db_name, backup_dirpath, callback) {
    var exec = require('child_process').exec,
        command = [
            'mongodump',
            '-d', db_name,
            '-o ', backup_dirpath
        ].join(' ');
    exec(command, function (err, stdout, stderr) {
        if (err) console.error(err);
        if (stderr) console.error(stderr);
        callback && callback();
    });
};

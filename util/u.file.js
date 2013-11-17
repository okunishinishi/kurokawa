var tek = require('tek'),
    JobQueue = tek['JobQueue'],
    path = require('path'),
    fs = require('fs');

exports.saveJson = function (filepath, data, callback) {
    fs.writeFile(filepath, JSON.stringify(data, null, 4), function (err) {
        err && handleErr(err);
        callback(filepath);
    })
};


exports.cleanDatePrefixFiles = function (dirpath, max, callback) {
    var now = new Date;
    var filepaths = tek.file.filesInDir(dirpath).filter(function (filepath) {
        var prefix = path.basename(filepath).split('.').shift(),
            date = new Date(Number(prefix));
        var valid = !isNaN(date.getTime());
        if (!valid) return false;

        var passed = now - date;
        return max < passed;
    });
    var queue = new JobQueue();
    filepaths.forEach(function (filepath) {
        queue.push(function (next) {
            fs.unlink(filepath, next);
        });
    });
    queue.execute(callback);
};
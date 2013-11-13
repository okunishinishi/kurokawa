/**
 * User: okunishitaka
 * Date: 9/20/13
 * Time: 6:41 AM
 */


var tek = require('tek'),
    config = require('../app.config'),
    publicDir = config['publicDir'],
    uploadDir = config['uploadDir'],
    path = require('path'),
    resolve = path['resolve'];


function ensureArray(obj) {
    if (!obj) return [];
    if (obj instanceof Array) {
        return obj;
    } else {
        return [obj];
    }
}


function rename(filename) {
    var extname = path['extname'],
        uuid = tek['util']['uuid'];

    return uuid() + extname(filename);
}

function save(files, saveDir, callback) {
    var fileUtil = tek['file'],
        copy = fileUtil['copy'],
        mkdirP = fileUtil['mkdirP'];

    if (files.length) {
        var file = files.shift(),
            savePath = resolve(saveDir, rename(file.name));
        mkdirP(savePath, function () {
            copy(file.path, savePath, function () {
                save(files, saveDir, function (saved) {
                    saved.push({
                        name: file.name,
                        url: savePath.replace(publicDir, '')
                    });
                    callback(saved);
                });
            });
        });
    } else {
        callback([]);
    }
}


exports.index = function (req, res) {
    res.render('upload/index');
};

exports.save = function (req, res) {
    var result = [];
    var names = Object.keys(req.files);
    var count = names.length;
    if (!count) {
        res.json(result);
        return;
    }
    names.forEach(function (name) {
        var saveDir = resolve(uploadDir, name);
        var files = ensureArray(req.files[name]);
        save(files, saveDir, function (saved) {
            result = result.concat(saved);
            count--;
            var finish = count <= 0;
            if (finish) {
                res.send(JSON.stringify(result));
            }
        });
    });
};
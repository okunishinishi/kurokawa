var fileUtil = require('../util/u.file');
var csv = require('../util/u.csv'),
    tek = require('tek'),
    mkdirP = tek.file.mkdirP,
    JobQueue = tek['JobQueue'],
    db = require('../db'),
    User = db.models['User'],
    path = require('path'),
    resolve = path.resolve,
    relative = path.relative,
    fs = require('fs'),
    saveJson = fileUtil.saveJson,
    config = require('../app.config.js'),
    upload = require('./r.upload')
    ;


exports.format = {};
exports.format.user_import = 'username,email,first_name,last_name,password,role'.split(',');

function handleErr(err) {
    console.error(err);
}


exports.parse_users = function (data, callback) {
    var line = data.pop();
    var row = data.length;
    if (line) {
        exports.parse_users(data, function (users, errors) {
            exports.parse_users.lineToUser(line, function (err, user) {
                users.push(user);
                errors = errors.concat((err || []).map(function (data) {
                    data.row = row;
                    return data;
                }));
                callback(users, errors);
            });
        });
    } else {
        callback([], []);
    }
};


exports.parse_users.lineToUser = function (line, callback) {
    var data = {};
    exports.format.user_import.forEach(function (key, i) {
        var value = line[i];
        if (value || (value === 0))data[key] = value;
    });
    User.newUser(data, function (user) {
        user.password_expired = true;
        var validated = user.validate(),
            err = validated.valid ? null : [].concat(validated.errors.map(function (data) {
                    if (data.property === 'password_digest') {
                        data.property = 'password';
                    }
                    var col = exports.format.user_import.indexOf(data.property);
                    if (col === -1) return null;
                    return {
                        col: col,
                        property: data.property,
                        msg: data.message
                    }
                })).filter(function (data) {
                    return !!data;
                });
        callback(err, user);
    });
};


exports.import_user = function (raw, callback) {
    exports.parse_users([].concat(raw), function (users, errors) {
        var valid = !errors.length;
        exports.import_user.save_preview(raw, errors, users, function (saved) {
            Object.keys(saved).forEach(function (key) {
                saved[key] = ['/', config.context, relative(config.publicDir, saved[key])].join('');
            });
            callback({
                valid: valid,
                files: saved
            });
        });
    });
};

exports.import_user.save_preview = function (raw, errors, users, callback) {
    var dirpath = resolve(config.jsonDir, 'preview/user_import'),
        t = new Date().getTime();

    var saved = {};

    function save_job(name, data) {
        return function (next) {
            if (!data) {
                next();
                return;
            }
            var filepath = resolve(dirpath, [t, name, 'json'].join('.'));
            saveJson(filepath, data, function (filepath) {
                saved[name] = filepath;
                next();
            })
        }
    }

    new JobQueue()
        .push(function (next) {
            fs.exists(dirpath, function (exists) {
                if (exists) {
                    next();
                } else {
                    mkdirP(dirpath, next);
                }
            });
        })
        .push(function (next) {
            var max = 24 * 60 * 60 * 1000;
            fileUtil.cleanDatePrefixFiles(dirpath, max, next);
        })
        .push(save_job('raw', raw))
        .push(save_job('errors', errors))
        .push(save_job('users', users))
        .execute(function () {
            callback(saved);
        });
};

exports.import_user.from_text = function (req, res) {
    var body = req['body'];
    csv.parseString(body['csv_text'], function (data) {
        exports.import_user(data, function (result) {
            res.json(result);
        });
    });
};


exports.import_user.from_file = function (req, res) {
    upload.saveUploaded(req, function (saved) {
        console.log('saved', saved);
        res.send(
            JSON.stringify({
                success: true
            })
        );
    });
};
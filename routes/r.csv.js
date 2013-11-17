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
exports.format.user_import_example = [
    {
        username: 't_okunishi',
        email: 't_okuni@example.com',
        first_name: 'Taka',
        last_name: 'Okunishi',
        password: 'asd3',
        role: 'admin'
    },
    {
        username: 'some_body',
        email: '',
        first_name: 'Sum',
        last_name: 'Body',
        password: 'ekj9',
        role: ''
    }
].map(function (user) {
        return exports.format.user_import.map(function (key) {
            return user[key];
        });
    });

function handleErr(err) {
    console.error(err);
}


exports.parse_users = function (data, callback) {
    var line = data.pop();
    var row = data.length;
    if (line) {
        exports.parse_users(data, function (users, errors) {
            exports.parse_users.lineToUser(line, function (err, user) {
                user.row = row;
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

function validateTakenValues(users, callback) {
    function takenErr(property, user, takens) {
        var taken = (takens.indexOf(user[property]) !== -1);
        return taken && {
            row: user.row,
            col: exports.format.user_import.indexOf(property),
            property: property,
            msg: ' is taken'
        }
    }

    User.listAllTakeValues(function (taken_usernames, taken_emails) {
        var errors = [];
        users.forEach(function (user) {
            var userTaken = takenErr('username', user, taken_usernames);
            if (userTaken) errors.push(userTaken);
            taken_usernames.push(user.username);
            var emailTaken = takenErr('email', user, taken_emails);
            if (emailTaken) errors.push(emailTaken);
            taken_emails.push(user.email);
        });
        callback && callback(errors);
    });
}

exports.import_user = function (raw, callback) {
    var hasHead = raw && raw.length && (raw[0].join(',') == exports.format.user_import.join(','));
    if (hasHead) raw.shift();
    exports.parse_users([].concat(raw), function (users, errors) {
            validateTakenValues(users, function (takenError) {
                errors = errors.concat(takenError);
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
        }
    );
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

function fail(res, errors, err_alert) {
    res.json({
        valid: false,
        errors: errors,
        err_alert: err_alert
    });
}

exports.import_user.execute = function (req, res) {
    var body = req.body,
        user_json_path = body['user_json_path'];

    var l = res.locals.l;
    if (!user_json_path) {
        fail(res, null, l.err.something_worng);
        return;
    }
    var json_filepath = resolve(config.publicDir + user_json_path);
    fs.exists(json_filepath, function (exists) {
        if (!exists) {
            fail(res, null, l.err.something_worng);
            return;
        }
        fs.readFile(json_filepath, function (err, buffer) {
            var users;
            try {
                err && handleErr(err);
                users = JSON.parse(buffer.toString()).map(function (user) {
                    return new User(user);
                })
            } catch (e) {
                console.error(e);
                fail(res, null, l.err.something_worng);
                return;
            }
            var errors = users
                .map(function (user) {
                    return user.validate().errors;
                })
                .filter(function (err) {
                    return !!err;
                })
                .reduce(function (a, b) {
                    return a.concat(b);
                });
            validateTakenValues(users, function (takenErr) {
                errors = errors.concat(takenErr);
                var valid = !(errors && errors.length);
                if (valid) {
                    req.flash('info_alert', l.msg.user_import_done);
                    User.saveAll(users, function () {
                        res.json({
                            valid: valid,
                            errors: errors
                        });
                    });
                } else {
                    fail(res, errors);
                }
            });
        });
    });

};
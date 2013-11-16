var csv = require('../util/u.csv'),
    db = require('../db'),
    User = db.models['User'],
    upload = require('./r.upload')
    ;


exports.format = 'username,email,first_name,last_name,password,role'.split(',');


exports.parseUsers = function (data, callback) {
    var line = data.pop();
    if (line) {
        exports.parseUsers(data, function (result) {
            exports.parseUsers.lineToUser(line, function (err, user) {
                result.push({
                    err:err,
                    user:user
                });
                callback(result);
            });
        });
    } else {
        callback([]);
    }
};


exports.parseUsers.lineToUser = function (line, callback) {
    var data = {};
    exports.format.forEach(function (key, i) {
        var value = line[i];
        if (value || (value === 0))data[key] = value;
    });
    User.newUser(data, function (user) {
        user.password_expired = true;

        var validated = user.validate(),
            err = validated.valid ? null : validated.errors;
        callback(err, user);
    });
};


exports.import_user = function (data, callback) {
    exports.parseUsers(data, function () {
        callback();
    });
};


exports.import_user.from_text = function (req, res) {
    var body = req['body'];
    csv.parseString(body['csv_text'], function () {
        res.json({})
    });
};
exports.import_user.from_file = function (req, res) {
    upload.saveUploaded(req, function (saved) {
        res.send(
            JSON.stringify({
                success: true
            })
        );
    });
};
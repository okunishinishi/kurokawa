var tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    Schema = DB['Schema'],
    util = require('../../util'),
    defineModel = DB['defineModel'];


var User = module.exports = defineModel({
    username: undefined,
    password_digest: undefined
});


User.schema = new Schema({
    username: {
        required: true,
        minLength: 2
    },
    password_digest: {
        required: true,
        minLength: 2
    }
});

User.prototype.validate = function () {
    var s = this;
    return User.schema.validate(s);
};
User.findByUsernameOrEmail = function (username_or_email, callback) {
    var s = this;
    return s.findOneByCondition({
        username: username_or_email
    }, function (user) {
        if (user) {
            callback(user);
        } else {
            s.findOneByCondition({
                email: username_or_email
            }, function (user) {
                callback(user);
            });
        }
    });
};

User.findByAuthData = function (username_or_email, password, callback) {
    var s = this;
    var valid = !!(username_or_email && password);
    if (!valid) {
        return callback && callback(false);
    }
    return s.findByUsernameOrEmail(username_or_email, function (user) {
        if (user) {
            util.auth.derive(password, user.salt, function (derived) {
                var valid = derived === user.password_digest;
                callback && callback(valid, user);
            });
        } else {
            callback && callback(false);
        }
    });
};
User.newSalt = function () {
    return util.auth.newSalt();
};
User.derive = function (password, salt, callback) {
    return util.auth.derive(password, salt, callback);
};

User.newUser = function (data, callback) {
    var user = new User(data);
    user.salt = User.newSalt();
    User.derive(user.password, user.salt, function (password_digest) {
        delete user.password;
        delete user.captcha_text;
        user.password_digest = password_digest;
        callback(user);
    });
};
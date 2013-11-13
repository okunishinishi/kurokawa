var db = require('../db'),
    config = require('../app.config'),
    validations = require('./validations'),
    User = db.models['User'];

function getSignUser(req) {
    return req.session && req.session.sign_user;
}
function setSignUser(req, user) {
    req.session.sign_user = user && new User(user);
    if (!req.session.sign_user) return;
    req.session.sign_user.password = undefined;
    req.session.sign_user.password_digest = undefined;
    req.session.sign_user.salt = undefined;
}
function clearSignUser(req) {
    req.session.sign_user = undefined;
}


/**
 * render index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    var sign_user = res.locals.sign_user;
    if (sign_user) {
        exports.success(req, res);
    } else {
        res.render('sign/index.jade', {
            err_alert: req.flash('err_alert'),
            info_alert: req.flash('info_alert'),
            back_url:req.flash('back_url')
        });
    }
};

exports.success = function (req, res) {
    res.redirect('/');
};

exports.err = function (req, res, err) {
    req.flash('err_alert', err);
    return res.redirect('/sign');
};

/**
 * signout
 * @param req
 * @param res
 */
exports.signout = function (req, res) {
    clearSignUser(req);
    var l = res.locals.l;
    req.flash('info_alert', l.msg.signout_done);
    res.redirect('/sign');
};

/**
 * sign filter
 * @param req
 * @param res
 * @param next
 */
exports.filter = function (req, res, next) {
    res.locals.sign_user = getSignUser(req);
    var needsSign = exports.filter.needsSign(req);
    res.locals.needs_sign = needsSign;
    if (needsSign) {
        req.flash('back_url', req.path);
        exports.err(req, res, null);
    } else {
        next();
    }
};

/**
 * if needs login or not
 * @param req
 * @returns {boolean}
 */
exports.filter.needsSign = function (req) {
    var enabled = config.sign_filter.enabled;
    if (!enabled) return false;
    var ignore_path = config.sign_filter.ignore_path;
    for (var i = 0; i < ignore_path.length; i++) {
        var ignore = req.path.match(ignore_path[i]);
        if (ignore) return false;
    }
    return !getSignUser(req);
};

/**
 * ajax routes for sign
 *
 */
exports.api = {};
exports.api.signin = function (req, res) {
    var schema = new validations.sign.SigninSchema();
    var body = req.body;

    schema.validate(body, function (valid, errors) {
        if (valid) {
            var username_or_email = body.username_or_email,
                password = body.password;
            User.findByAuthData(username_or_email, password, function (valid, user) {
                var l = res.locals.l;
                if (valid) {
                    setSignUser(req, user);
                    res.json({
                        valid: valid,
                        user: getSignUser(req)
                    });
                } else {
                    res.json({
                        valid: valid,
                        err_alert: l.err.loign_failed
                    });
                }
            });
        } else {
            res.json({
                valid: valid,
                errors: errors
            });
        }
    });

};
/**
 * ajax signup
 * @param req
 * @param res
 */
exports.api.signup = function (req, res) {
    var l = res.locals.l,
        schema = new validations.sign.SignupSchema(),
        body = req.body || {};
    schema
        .asyncConform('username', function (username, callback) {
            User.findOneByCondition({username: username}, function (duplicate) {
                var valid = !duplicate;
                callback(valid, l.err.already_taken);
            });
        })
        .asyncConform('captcha_text', function (captcha_text, callback) {
            var valid = req.session.captcha_text === (captcha_text && captcha_text.trim());
            callback(valid, l.err.is_wrong);
        })
        .validate(body, function (valid, errors) {
            if (!valid) {
                res.json({
                    valid: valid,
                    errors: errors
                });
                return;
            }
            var user = new User(body);
            user.salt = User.newSalt();
            User.derive(user.password, user.salt, function (password_digest) {
                delete user.password;
                delete user.captcha_text;
                user.password_digest = password_digest;
                user.save(function (user) {
                    setSignUser(req, user);
                    res.json({
                        valid: true,
                        user: user
                    });
                });
            });
        });
};
/**
 * generate captcha image and save digit to session
 * @param req
 * @param res
 */
exports.api.captcha = function (req, res) {
    var captcha = require('../util/u.captcha'),
        text = ('' + Math.random()).substr(3, 5);
    captcha.newBuffer(text, function (err, buffer) {
        if (err) console.error(err);
        req.session.captcha_text = text;
        res.end(buffer);
    });

};

exports.getSignUser = getSignUser;
exports.setSignUser = setSignUser;
exports.clearSignUser = clearSignUser;
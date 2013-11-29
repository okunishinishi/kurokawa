var tek = require('tek'),
    copy = tek.meta.copy,
    db = require('../db'),
    sign = require('./r.sign'),
    validations = require('./validations'),
    getSignUser = sign.getSignUser,
    setSignUser = sign.setSignUser,
    csv = require('./r.csv'),
    User = db.models['User'],
    Team = db.models['Team'],
    JobQueue = tek['JobQueue'];

/**
 * find single model
 * @param _id
 * @param callback
 * @returns {*}
 */
function findOne(_id, callback) {
    return User.findById(_id, callback);
}

/**
 * list models
 * @param condition
 * @param limit
 * @param skip
 * @param callback
 * @returns {*|Cursor}
 */
function find(condition, limit, skip, callback) {
    return User.findByCondition(condition,function (models) {
        callback(models.splice(skip, limit));
    }).limit(limit).skip(skip);
}


/**
 * render index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('user/index.jade', {});
};

/**
 * render mypage
 * @param req
 * @param res
 */
exports.mypage = function (req, res) {
    var user = getSignUser(req);
    User.findOneByCondition({username: user.username}, function (sign_user) {
        setSignUser(req, sign_user);
        Team.findAll(function (teams) {
            res.render('user/mypage.jade', {
                teams: teams
            });
        });
    });
};

exports.api = {
    /**
     * one data
     * @param req
     * @param res
     */
    one: function (req, res) {
        var p = req['param'];
        findOne(p._id, function (model) {
            res.json(model);
        });
    },

    /**
     * list data
     * @param req
     * @param res
     */
    list: function (req, res) {
        var parameters = {
            skip: 0,
            limit: 500,
            search_word: null
        };
        copy(eval(req.query), parameters);

        var skip = Number(parameters.skip),
            limit = Number(parameters.limit),
            search_word = parameters.search_word,
            condition = {};

        if (search_word) {
            var search_fields = ['username'];
            search_fields.forEach(function (field) {
                condition[field] = search_word;
            });
            condition = new db.AmbiguousCondition(condition);
        }

        find(condition, limit, skip, function (users) {
            users.forEach(function (user) {
                delete user.salt;
                delete user.password_digest;
            });
            res.json(users);
        });
    },

    /**
     * save data
     * @param req
     * @param res
     */
    save: function (req, res) {
        var l = res.locals.l;
        var user = new User(req.body);

        function send(user, action) {
            user[action](function (user) {
                res.json({
                    valid: true,
                    model: user,
                    action: action
                });
            });
        }

        findOne(user._id, function (duplicate) {
            var action = duplicate ? 'update' : 'save';
            if (duplicate) {
                var vr = user._vr,
                    conflict = vr && (vr != duplicate._vr);
                if (conflict) {
                    res.json({
                        valid: false,
                        err_alert: l.err.conflict
                    });
                    return;
                }
                validateUserChange(duplicate, user, function (errors) {
                    if (errors) {
                        res.json({
                            valid: false,
                            errors: errors
                        });
                        return;
                    }
                    delete user.password_digest;
                    copy.fallback(duplicate, user);
                    var result = user.validate();
                    if (!result.valid) {
                        res.json(result);
                        return;
                    }
                    send(user, action);
                });
            } else {
                var result = user.validate();
                if (!result.valid) {
                    res.json(result);
                    return;
                }
                send(user, action);
            }

        });
    },
    /**
     * change password
     * @param req
     * @param res
     */
    change_password: function (req, res) {
        var body = req.body;
        var _id = body && body['_id'];
        var schema = new validations.user.PasswordChangeSchema();
        schema.validate(body, function (valid, errors) {
            if (valid) {
                findOne(_id, function (user) {
                    if (!user) {
                        res.json({
                            valid: false,
                            err_alert: l.err.something_worng
                        });
                        return;
                    }
                    var passwordMatches = body.password == body.password_confirm;
                    if (!passwordMatches) {
                        res.json({
                            valid: false,
                            errors: [
                                {
                                    label: '!',
                                    property: 'password_confirm',
                                    message: l.err.password_not_match
                                }
                            ]
                        });
                        return;
                    }
                    User.derive(body.password, user.salt, function (password_digest) {
                        delete user.password;
                        delete user.captcha_text;
                        user.password_digest = password_digest;
                        user.password_expired = false;
                        req.flash('info_alert', l.msg.password_change_done);
                        user.update(function () {
                            res.json({
                                valid: true,
                                info_alert: l.msg.password_change_done,
                                model: user
                            });
                        });
                    });
                });
            } else {
                res.json({
                    valid: valid,
                    errors: errors
                });
            }
        });
    },

    /**
     * destroy data
     * @param req
     * @param res
     */
    destroy: function (req, res) {
        var body = req.body;
        var _id = body && body['_id'];
        findOne(_id, function (user) {
            if (user) {
                var l = res.locals.l;
                req.flash('info_alert', l.msg.user_destroy_done);
                user.remove(function () {
                    res.json({count: 1});
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};


function validateUserChange(orign, changed, callback) {
    var queue = new JobQueue,
        errors = [];

    function validate(key) {
        return function (next) {
            var isChanged = changed[key] && (orign[key] != changed[key]);
            if (!isChanged) {
                next();
                return;
            }
            var condition = {};
            condition[key] = changed[key];
            User.findOneByCondition(condition, function (duplicate) {
                if (duplicate)errors.push({
                    property: key,
                    message: 'is already taken'
                });
                next();
            });
        }
    }

    queue.push(validate('username'));
    queue.push(validate('email'));
    queue.execute(function () {
        callback && callback(errors.length && errors || null);
    });
}
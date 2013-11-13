var tek = require('tek'),
    copy = tek.meta.copy,
    db = require('../db'),
    getSignUser = require('./r.sign').getSignUser,
    User = db.models['User'];

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
    User.findById(user._id, function (sign_user) {
        res.render('user/mypage.jade', {
            sign_user:sign_user
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
            var search_fields = ['name'];
            search_fields.forEach(function (field) {
                condition[field] = search_word;
            });
            condition = new db.AmbiguousCondition(condition);
        }

        find(condition, limit, skip, function (models) {
            res.json(models);
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
        var result = user.validate();
        if (!result.valid) {
            res.json(result);
            return;
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
                copy.fallback(duplicate, user);
            }
            user[action](function (user) {
                res.json({
                    valid: true,
                    model: user,
                    action: action
                });
            });
        });
    },

    /**
     * destroy data
     * @param req
     * @param res
     */
    destroy: function (req, res) {
        var _id = req.body['_id'];
        findOne(_id, function (user) {
            if (user) {
                user.remove(function () {
                    res.json({count: 1});
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};

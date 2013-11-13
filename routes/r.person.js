var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Person = db.models['Person'];

function notFound(res) {
    res.redirect('/404');
}

/**
 * find single model
 * @param _id
 * @param callback
 * @returns {*}
 */
function findOne(_id, callback) {
    return Person.findById(_id, callback);
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
    return Person.findByCondition(condition,function (models) {
        callback(models.splice(skip, limit));
    }).limit(limit).skip(skip);
}

/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    var p = req.params;
    if (!p._id) {
        notFound(res);
        return;
    }
    Person.findById(p._id, function (person) {
        if(!person){
            notFound(res);
            return;
        }
        res.render('person/index.jade', {
            person:person
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
        var person = new Person(req.body);
        var result = person.validate();
        if (!result.valid) {
            res.json(result);
            return;
        }
        findOne(person._id, function (duplicate) {
            var action = duplicate ? 'update' : 'save';
            if (duplicate) {
                var vr = person._vr,
                    conflict = vr && (vr != duplicate._vr);
                if (conflict) {
                    const l = res.locals.l;
                    res.json({
                        valid: false,
                        errors: [l.err.conflict]
                    });
                    return;
                }
                copy.fallback(duplicate, person);
            }
            person[action](function (person) {
                res.json({
                    valid: true,
                    model: person,
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
        findOne(_id, function (person) {
            if (person) {
                person.remove(function () {
                    res.json({count: 1});
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};

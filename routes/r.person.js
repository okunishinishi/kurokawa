var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Person = db.models['Person'],
    PersonUpdate = db.models['PersonUpdate'],
    Company = db.models['Company'],
    util = require('../util'),
    toIdMap = util.obj.toIdMap;

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
        if (!person) {
            notFound(res);
            return;
        }
        Company.findAll(function (companies) {
            var companyMap = toIdMap(companies);
            var company = companyMap[person.company_id];
            person.company_name = company && company.name;
            PersonUpdate.findByPerson(person, function (personUpdate) {
                res.render('person/index.jade', {
                    person: person,
                    companies: companies,
                    personUpdate: personUpdate
                });
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

        function save(person, action) {
            person[action](function (person) {
                res.json({
                    valid: true,
                    model: person,
                    action: action
                });
            });
        }

        findOne(person._id, function (duplicate) {
            var action = duplicate ? 'update' : 'save';
            if (duplicate) {
                var vr = person._vr,
                    conflict = vr && (vr != duplicate._vr);
                if (conflict) {
                    var l = res.locals.l;
                    res.json({
                        valid: false,
                        err_alert: l.err.conflict
                    });
                    return;
                }
                var change = duplicate.getChanges(person) || [];
                var sign_user = res.locals.sign_user;
                change.forEach(function (change) {
                    change.user_id = sign_user._id;
                    change.username = sign_user.username;
                });
                copy.fallback(duplicate, person);
                PersonUpdate.findByPerson(person, function (personUpdate) {
                    personUpdate.changes = change.concat(personUpdate.changes);
                    personUpdate.update(function () {
                        person.person_update_id = personUpdate._id;
                        save(person, action);
                    });
                });
            } else {
                save(person, action);
            }
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

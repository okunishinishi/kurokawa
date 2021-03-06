var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Person = db.models['Person'],
    PersonUpdate = db.models['PersonUpdate'],
    dateformat = require('dateformat'),
    Company = db.models['Company'],
    util = require('../util'),
    toIdMap = util.obj.toIdMap,
    Helper = db.models['Helper'];

function notFound(res) {
    res.redirect('/404');
}

function formatChange(change) {
    change.date_label = dateformat(new Date(Number(change.date)), 'yyyy/mm/dd HH:MM:ss');
    return change;
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
exports.new = function (req, res) {
    var q = req.query,
        company_id = q && q.company_id;
    if (!company_id) {
        notFound(res);
        return;
    }
    Company.findById(company_id, function (company) {
        var person = new Person({
            company_id: company_id
        });
        person.save(function (person) {
            res.redirect('/person/' + person._id.toString() + '?mode=edit');
        });
    });
};
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
            Helper.findSingleton(function (helper) {
                Company.findAll(function (companies) {
                    var companyMap = toIdMap(companies);
                    var company = companyMap[person.company_id];
                    person.company_name = company && company.name;
                    PersonUpdate.findByPerson(person, function (personUpdate) {
                        personUpdate.changes = personUpdate && personUpdate.changes.map(function (change) {
                            return formatChange(change);
                        });
                        res.render('person/index.jade', {
                            person: person,
                            companies: companies,
                            personUpdate: personUpdate,
                            basic_data_keys: Person.basic_data_keys,
                            extra_data_keys: Person.extra_data_keys,
                            person_helpers: helper.person || ''
                        });
                    });
                });
            });
        }
    )
    ;
}
;


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

        function save(person, action, change) {
            person[action](function (person) {
                res.json({
                    valid: true,
                    model: person,
                    action: action,
                    change: change
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
                console.log('change', change);
                var sign_user = res.locals.sign_user;
                change.forEach(function (change) {
                    change.user_id = sign_user._id;
                    change.username = sign_user.username;
                });
                copy.fallback(duplicate, person);
                PersonUpdate.findByPerson(person, function (personUpdate) {
                    personUpdate.changes = change.concat(personUpdate.changes).sort(function (a, b) {
                        return Number(b.date) - Number(a.date);
                    });
                    personUpdate.mergeTooNearChanges();
                    personUpdate.update(function () {
                        person.person_update_id = personUpdate._id.toString();
                        save(person, action, change.map(function (change) {
                            return formatChange(change);
                        }));
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
                    var l = res.locals.l;
                    req.flash('info_alert', l.msg.person_destroy_done);
                    PersonUpdate.findByPerson(person, function (personUpdate) {
                        if (personUpdate) {
                            personUpdate.remove(function () {
                                res.json({count: 1});
                            });
                        } else {
                            res.json({count: 1});
                        }
                    });
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};

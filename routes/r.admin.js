var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    config = require('../app.config'),
    ScoreRule = db.models['ScoreRule'],
    Person = db.models['Person'],
    Team = db.models['Team'];


/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('admin/index.jade', {
        info_alert: req.flash('info_alert')
    });
};

/**
 * show master manage page
 * @param req
 * @param res
 */
exports.master = function (req, res) {
    res.render('admin/master.jade', {});
};

/**
 * show user manage page
 * @param req
 * @param res
 */
exports.user = function (req, res) {
    Team.findByCondition({}, function (teams) {
        res.render('admin/user.jade', {
            info_alert: req.flash('info_alert'),
            teams: teams
        });
    });
};

/**
 * show score_rule page
 * @param req
 * @param res
 */
exports.score_rule = function (req, res) {
    ScoreRule.findSingleton(function (scoreRule) {
        res.render('admin/score_rule.jade', {
            scoreRule: scoreRule,
            person_keys: {
                basic_data_keys: Person.basic_data_keys,
                extra_data_keys: Person.extra_data_keys
            },
            report_publish_interval: config.reportPublishInterval
        });
    });
};

//noinspection ReservedWordAsName
/**
 * show user import page
 * @param req
 * @param res
 */
exports.user.import = function (req, res) {
    var format = require('./r.csv').format;
    res.render('admin/user_import.jade', {
        csv_headers: format.user_import,
        csv_examples: format.user_import_example
    });
};

exports.person = {};

exports.person.import = function (req, res) {
    var format = require('./r.csv').format;
    res.render('admin/person_import.jade', {
        csv_headers: format.person_import,
        csv_examples: format.person_import_example
    });
};
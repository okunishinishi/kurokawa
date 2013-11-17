var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Team = db.models['Team'];


/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('admin/index.jade', {});
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
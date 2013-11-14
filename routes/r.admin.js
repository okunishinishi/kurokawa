var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db');


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
    res.render('admin/user.jade', {});
};
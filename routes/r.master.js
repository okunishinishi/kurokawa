var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db');


/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('master/index.jade', {});
};


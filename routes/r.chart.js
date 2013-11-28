var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Company = db.models['Company'],
    Person = db.models['Person'];


function notFound(res) {
    res.redirect('/404');
}

/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    var p = req.params;
    exports.getData(p.company_id, function (persons, company) {
        if (!persons) {
            notFound(res);
            return;
        }
        res.render('chart/index.jade', {
            persons: persons,
            company: company,
            info_alert: req.flash('info_alert')
        });
    });
};


exports.getData = function (company_id, callback) {
    if (!company_id) {
        callback(null);
        return;
    }
    Company.findById(company_id.toString(), function (company) {
        if (!company) {
            callback(null);
            return;
        }
        Person.findByCondition({
            company_id: company._id.toString()
        }, function (persons) {
            callback(persons, company);
        });
    });
};




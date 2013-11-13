var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Company = db.models['Company'];


function notFound(res) {
    res.redirect('/404');
}

/**
 * show index page
 * @param req
 * @param res
 */
exports.sheet = function (req, res) {
    var p = req.params;
    exports.getData(p.company_id, function (data, company) {
        if (!data) {
            notFound(res);
            return;
        }
        res.render('chart/sheet.jade', {
            company:company
        });
    });
};
exports.getData = function (company_id, callback) {
    if(!company_id){
        callback(null);
        return;
    }
    console.log('company_id',company_id,company_id.length);
    Company.findById(company_id.toString(), function (company) {
        if (!company) {
            callback(null);
            return;
        }
        callback({}, company);
    });
};




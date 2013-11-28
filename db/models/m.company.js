/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 6:57 PM
 */

var tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    Schema = DB['Schema'],
    defineModel = DB['defineModel'];

var Company = module.exports = defineModel({
    //properties
    parent_id: null,
    children_ids: []
});

Company.schema = new Schema({
    //schemas

});

Company.prototype.validate = function () {
    var s = this;
    return Company.schema.validate(s);
};


Company.listUnknownCompanies = function (company_names, callback) {
    Company.findAll(function (companies) {
        var unknowns = companies
            .filter(function (company) {
                return company_names.indexOf(company.name) === -1;
            })
            .map(function (company_name) {
                return new Company({
                    name: company_name
                });
            });
        callback(unknowns);
    });
};

Company.mapCompanyByName = function (callback) {
    var result = {};
    Company.findAll(function (companies) {
        companies.forEach(function (company) {
            var name = company.name;
            result[name] = company;
        });
        callback(result);
    });
};
var Company = require('../../../db/models/m.company'),
    should = require('should');

Company.findAll = function (callback) {
    callback([
        {name: 'known1'},
        {name: 'known2'}
    ])
};
exports.listUnknownCompaniesTest = function (test) {
    Company.listUnknownCompanies('known2,unknown1,unknown2'.split(','), function (companies) {
        companies.should.be.lengthOf(2);
        test.done();
    });
};
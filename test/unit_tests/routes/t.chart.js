var should = require('should'),
    chart = require('../../../routes/r.chart.js');

exports.indexTest = function (test) {
    chart.index(null, {
        render: function (view) {
            view.should.equal('chart/index.jade');
            test.done();
        }
    });
};
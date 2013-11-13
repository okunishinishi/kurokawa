/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 6:24 PM
 */

var tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    connectors = DB['connectors'],
    models = require('./models'),
    config = require('../app.config')['db'];

var url = [config.host, config.name].join('/');
module.exports = new DB(url, models, connectors[config.kind]);



/**
 * User: okunishitaka
 * Date: 9/20/13
 * Time: 6:40 AM
 */

var tek = require('tek'),
    ModuleCollector = tek['meta']['ModuleCollector'];

module.exports = new ModuleCollector(__dirname).collect('r');
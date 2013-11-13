/**
 * client side validation
 * @type {exports|*}
 */
var fs = require('fs'),
    revalidator = require('revalidator'),
    resolve = require('path').resolve;

var publicJSDir = resolve(__dirname, '../../public/javascripts'),
    publicVDir = resolve(publicJSDir, 'validation');


var window = {},
    v = null,
    tek = null,
    json = window.json;

function evalScriptFile(filepath) {
    var script = fs.readFileSync(filepath);
    eval(script.toString());
}

module.exports = (function () {
    evalScriptFile(resolve(publicJSDir, 'lib/revalidator.js'));
    evalScriptFile(resolve(publicJSDir, 'lib/tek.js'));
    fs.readdirSync(publicVDir).sort(function(a,b){
        return a.split('.').length - b.split('.').length;
    })
        .forEach(function (filename) {
            evalScriptFile(resolve(publicVDir, filename));
        });
    return v;
})();

/**
 * User: okunishitaka
 * Date: 9/20/13
 * Time: 6:44 AM
 */

var flash = require('connect-flash'),
    lessMiddleware = require('less-middleware'),
    express = require('express'),
    path = require('path'),
    env = process['env'],
    resolve = path['resolve'];


exports.package = require('./package.json');

exports.viewDir = resolve(__dirname, 'views');
exports.publicDir = resolve(__dirname, 'public');
exports.uploadDir = resolve(exports.publicDir, 'uploaded');
exports.jsDir = resolve(exports.publicDir, 'javascripts');
exports.imgDir = resolve(exports.publicDir, 'images');
exports.cssDir = resolve(exports.publicDir, 'stylesheets');
exports.hbsDir = resolve(exports.publicDir, 'hbs');
exports.hbsTemplateFile = resolve(exports.jsDir, "templates.js");

exports.set = {
    'port': env['PORT'] || eval('3084'),
    'views': exports.viewDir,
    'view engine': 'jade'
};

var version = exports.package.version;
exports.use = [
    express.cookieParser(),
    express.cookieSession({
        secret: '1384337047839' + version.replace(/\./g, '')
    }),
    flash(),
    express['favicon'](),
    express.logger('dev'),
    express.json(),
    express.urlencoded(),
    express['methodOverride'](),
    lessMiddleware({src: exports.publicDir}),
    express.static(exports.publicDir)
];

//exports.db = {
//    kind: 'mongojs',
//    host: 'localhost',
//    name: 'kurokawa'.replace(/\./g, '_')
//};

exports.db = {
    kind: 'sqlite3',
    host: resolve(__dirname),
    name: 'kurokawa'.replace(/\./g, '_') + ".db"
};

exports.context = '';


exports.sign_filter = {
    enabled: true,
    ignore_path: '/javascripts,/images,/stylesheets,/sign'.split(',')
};
var path = require('path'),
    http = require('http'),
    express = require('express'),
    util = require('./util'),
    NODE_ENV = process.env.NODE_ENV,
    config = require('./app.config'),
    locale = require('./locale');


var app = express();

app.configure('all', function () {
    Object.keys(config.set).forEach(function (key) {
        app.set(key, config.set[key]);
    });

    config.use.forEach(function (use) {
        app.use(use);
    });

    app.use(app['router']);
});

app.configure('development', function () {
    var errorHandler = express['errorHandler'];
    app.use(errorHandler());

    var hbs = require('./util/u.hbs');
    hbs.precompileAll(config.hbsDir, config.hbsTemplateFile, function () {
        console.log('precompile templates file:', config.hbsTemplateFile);
    });

    var publish = require('./util/u.publish'),
        resolve = require('path').resolve;
    Object.keys(locale).forEach(function (lang) {
        if (lang == 'default') return;
        var filepath = resolve(config.jsDir, "locale", ['l', lang, 'js'].join('.'));
        publish(filepath, 'l', locale[lang], function (filepath) {
            console.log('published locale file:', filepath);
        });
    });
});

app.locals({
    version: config.package.version,
    url: util.url.publicResolver(config),
    NODE_ENV: NODE_ENV
});

app.all('*', function (req, res, next) {
//    var lang = util['lang'];
//    res.locals.lang = lang.fromRequest(req);
    res.locals.lang = 'ja';
    res.locals.l = locale[res.locals.lang];
    res.locals.context = config.context;
    next();
});

(function (routes) {
    Object.keys(routes).sort().forEach(function (method) {
        routes[method].forEach(function (route) {
            app[method](route[0], route[1]);
        });
    });
})(require('./app.route'));


(function (render, redirect) {
    app.response.__proto__.redirect = function (newpath) {
        var s = this;
        newpath = require('path').resolve('/', s.locals.context, newpath);
        return redirect.call(s, newpath);
    };
})(app.response.__proto__.render, app.response.__proto__.redirect);

http.createServer(app).listen(app.get('port'), function () {
    console.log('NODE_ENV=' + NODE_ENV);
    console.log("Express server listening on port " + app.get('port'));
});


(function (report) {
    function publishScoreReport() {
        report.publishScoreReport(function (fiepath) {
            console.log('score report published:', fiepath);
        });
    }

    setInterval(publishScoreReport, config.reportPublishInterval);
    publishScoreReport();
})(require('./routes/r.report'));
var tek = require('tek'),
    copy = tek['meta']['copy'],
    file = tek['file'],
    path = require('path'),
    resolve = path['resolve'],
    config = require('../app.config'),
    db = require('../db'),
    obj = require('../util/u.obj'),
    models = db.models;

var publicDir = config.publicDir,
    reportDir = resolve(config.jsDir, 'report');

/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('report/index.jade', {});
};

/**
 * get scores from db
 * @param callback
 */
exports.aggregateScores = function (callback) {
    var toIdMap = obj['toIdMap'],
        ScoreRule = models['ScoreRule'],
        PersonUpdate = models['PersonUpdate'];
    ScoreRule.findSingleton(function (scoreRule) {
        PersonUpdate.findAll(function (personUpdates) {
            var userMap = {};
            personUpdates.forEach(function (personUpdate) {
                personUpdate.changes.forEach(function (change) {
                    var score = scoreRule.person[change.property];
                    if (!score) return;
                    score = Number(score);

                    var user_id = change.user_id,
                        user_scores = userMap[user_id];
                    if (!user_scores) {
                        user_scores = userMap[user_id] = {
                            total: 0,
                            detail: []
                        };
                    }
                    user_scores.total += score;
                    delete change.user_id;
                    user_scores.detail.push(change);
                });
            });
            var result = Object.keys(userMap).map(function (user_id) {
                var data = userMap[user_id];
                data.user_id = user_id;
                return data;
            });
            callback(result);
        });
    });
};

exports.publishScoreReport = function (callback) {
    var publish = require('../util/u.publish');

    exports.aggregateScores(function (data) {
        var filepath = resolve(reportDir, 'report.score.js');
        publish(filepath, 'report.score', data, function (filepath) {
            callback && callback(filepath);
        });
    });
};

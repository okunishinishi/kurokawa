var tek = require('tek'),
    copy = tek['meta']['copy'],
    file = tek['file'],
    path = require('path'),
    resolve = path['resolve'],
    config = require('../app.config'),
    db = require('../db'),
    obj = require('../util/u.obj'),
    models = db.models;

var publicDir = config.publicDir;

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
                    var score = scoreRule.person && scoreRule.person[change.property];
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
    var User = models['User'],
        Team = models['Team'],
        toIdMap = obj['toIdMap'];
    exports.aggregateScores(function (data) {
        Team.findAll(function (teams) {
            User.findAll(function (users) {
                var userMap = toIdMap(users),
                    teamMap = toIdMap(teams);
                data = data
                    .map(function (data) {
                        var user = userMap[data.user_id];
                        if (!user) return null;
                        var team = user && teamMap[user.team_id] || {};
                        data.username = user.username;
                        data.real_name = user.real_name;
                        data.team_name = team.name;
                        return data;
                    })
                    .filter(function (data) {
                        return !!data;
                    });
                var dataDir = resolve(config.jsDir, 'data');
                var filepath = resolve(dataDir, 'd.report.score.js');
                publish(filepath, 'd.report.score', data, function (filepath) {
                    callback && callback(filepath);
                });
            });
        });
    });
};

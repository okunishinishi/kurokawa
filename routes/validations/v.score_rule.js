var ServerSide = require('./serverside'),
    clientside = require('./clientside').score_rule;

exports.NewSunshineSchema = ServerSide.extend(clientside.new_score_rule);
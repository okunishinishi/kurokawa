var ServerSide = require('./serverside'),
    clientside = require('./clientside').issue;

exports.NewSunshineSchema = ServerSide.extend(clientside.new_issue);
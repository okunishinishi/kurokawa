var ServerSide = require('./serverside'),
    clientside = require('./clientside').team;

exports.NewSunshineSchema = ServerSide.extend(clientside.new_team);
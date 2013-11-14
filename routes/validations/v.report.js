var ServerSide = require('./serverside'),
    clientside = require('./clientside').report;

exports.NewSunshineSchema = ServerSide.extend(clientside.new_report);
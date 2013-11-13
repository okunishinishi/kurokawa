var ServerSide = require('./serverside'),
    clientside = require('./clientside').company;

exports.NewSunshineSchema = ServerSide.extend(clientside.new_company);
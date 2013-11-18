var ServerSide = require('./serverside'),
    clientside = require('./clientside').person_update;

exports.NewSunshineSchema = ServerSide.extend(clientside.new_person_update);
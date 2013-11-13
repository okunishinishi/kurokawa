var ServerSide = require('./serverside'),
    clientside = require('./clientside').person;

exports.NewSunshineSchema = ServerSide.extend(clientside.new_person);
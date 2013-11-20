var ServerSide = require('./serverside'),
    clientside = require('./clientside').user;

exports.PasswordChangeSchema = ServerSide.extend(clientside.password_change);
var ServerSide = require('./serverside'),
    clientside = require('./clientside').sign;

exports.SigninSchema = ServerSide.extend(clientside.signin);
exports.SignupSchema = ServerSide.extend(clientside.signup);
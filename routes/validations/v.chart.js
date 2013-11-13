var ServerSide = require('./serverside'),
    clientside = require('./clientside').chart;

exports.NewSunshineSchema = ServerSide.extend(clientside.new_chart);
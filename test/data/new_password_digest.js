var User = require('../../db/models/m.User');


var password = 'pass',
    salt = 'ZQfMfvdPhabs2dbox9iT6MFuSQLbWKKHV4EFHM6FpB19zg/mvyxFI837a2sv/ZZAFGC5CSxwuACgtpGnXPn0Zj0pqluTYLkhv2u4zEe9oL6VO1x7SynuQgiakUSOty6xygQ+btE+COxcUXJP1JrQutuy/JsDvDvbP+eICVdPTzs=';
User.derive(password, salt, function (password_digest) {
    console.log('password_digest', password_digest);
});
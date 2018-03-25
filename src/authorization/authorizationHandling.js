const scopes = require('../config/constants').scopes;

module.exports.getScope = function (username) {
    var scope = [];

    // Add scopes here

    scope.push(scopes.ReadAwesomeHackers);
    return scope;
}
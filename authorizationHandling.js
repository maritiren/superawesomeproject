module.exports.getScope = function (username) {
    var scope = [];
    if (username == "ADMIN" ) {
        scope.push(scopes.ReadFlag);
    }
    scope.push(scopes.ReadAwesomeHackers);
    return scope;
}
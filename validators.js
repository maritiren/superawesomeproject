const validator = require('validator');

/*
* Only allow whitelisted values in order to avoid injection.
*/

module.exports.validateAlphaNumString = function (input) {
    if (validator.isAlphanumeric(input + '') || input == '') {
        return input;
    } else {
        winston.log('Illegal alphanumeric input string: ' + input);
        throw 'Illegal alphanumeric input string: ' + input;
    }
}
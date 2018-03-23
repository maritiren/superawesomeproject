const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./constants').jwtSecret;
const issuer = require('./constants').issuerDomain;
const scopes = require('./constants').scopes;
const guard = require('express-jwt-permissions')({
    permissionsProperty: 'scope'
});

const validateAlphaNumString = require('./validators').validateAlphaNumString;
const invalidUsernameError = require('./ErrorHandling/errorMessages').invalidUsername;
const missingTokenError = require('./ErrorHandling/errorMessages').missingToken;

const getScope = require('./authorizationHandling.js').getScope;

const TOKEN_VALID_MINUTES = 60;
const apiRoutes = express.Router();

apiRoutes.get('/health', function (req, res) {
    res.send('Super awesome web project server working...');
});

// Login user
apiRoutes.post('/login', function (req, res) {
    let validated = {};
    try {
        validated.username = validateDescription(req.body.username).toUpperCase();
    } catch (e) {
        res.status(422).send({error: 'Your username may only have alphanumerical values.. Are you trying to hack me?'});
        return;
    }

    if (validated.username == "ADMIN" && password != "AC3048783DA0B281B6F88FD3F177807F17A9B8AAEDDA5E6185AB6A759BEB105C") {
        res.status(401).send("Wrong username or password.");
    }

    const exp = Math.floor(Date.now() / 1000) + (TOKEN_VALID_MINUTES * 60);
    const expDate = new Date();
    expDate.setMinutes(expDate.getMinutes() + TOKEN_VALID_MINUTES);
    const payload = {
        "iat": Date.now(),
        "exp": exp, 
        "sub": validated.username,
        "iss": issuer,
        "scope": getScope(validated.username)
    };
    const token = jwt.sign(payload, jwtSecret);

    res.status(200).send({user: validated.username, token: token, exp: expDate});
});

apiRoutes.get('/validateToken/:username', (req, res) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(404).send({error: });
    }

    let validated = {};
    try {
        validated.urlUser = validateAlphaNumString(req.params.username).toUpperCase();
    } catch (e) {
        res.status(422).send({error: 'Your username may only have alphanumerical values.. Are you trying to hack me?'});
        return;
    }

    req.user = {};
    jwt.verify(token, jwtSecret, { ignoreExpiration: false, algorithms: ['HS256'] }, (e, decoded) => {
        if (e) {
            res.status(401).send("Token not verified. Are you trying to falsify a token? :O");
            return;
        } else {
            req.user = decoded;
            res.status(200).send("Token verified!");
        }
    });
});

apiRoutes.use((req, res, next) => {
    // Validate token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({error: });
    }

    /* *
     * Check that the JWT is well formed
     * Check the signature
     * Validate the standard claims
     * Check the Client permissions (scopes) */
    req.user = {};
    jwt.verify(token, jwtSecret, { ignoreExpiration: false, algorithms: ['HS256'] }, (e, decoded) => {
        if (e) {
            res.status(401).send("Token not verified. Are you trying to falsify a token? :O");
            return;
        } else {
            req.user = decoded;
            next();
        }
    });
});

//Get a list of awesome hackers
apiRoutes.get('/awesomeHackerList', guard.check([scopes.ReadAwesomeHackers]), function (req, res) {
    const awesomeHackerList = [
        {
            "name": "maritio_o"
        },
        {
            "name": "Nohack"
        },
        {
            "name": "9co"
        },
        {
            "name": "roypur"
        },
        {
            "name": "PewZ"
        },
        {
            "name": "Chabz"
        },
        {
            "name": "bolzzy"
        },
        {
            "name": "kristebo"
        }
    ];
    res.status(200).send({awesomeHackers: awesomeHackerList});
});

apiRoutes.get('/flag', guard.check([scopes.ReadFlag]), function (req, res) {
    // Do critical functionality here

    const flag = "placeholder for flag"

    res.status(200).send({flag: flag});
});

module.exports = apiRoutes;
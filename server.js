const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('./swagger.json');
const api = require('./api');

const app = express();

const port = 5063;

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api', api);

app.listen(port, () => {
    console.log('Superawesome hacker project server listening on port %d', port);
});

/*const httpsServer = https.createServer(credentials, app).listen(port, () => {
    console.log('HTTP server listening on port %d in %s mode', port, process.env.NODE_ENV);
});*/
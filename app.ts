
import * as express from "express";
//var swaggerJSDoc = require('swagger-jsdoc');

import { ectd_router }  from "./src/routers/cissukl_ectd_router";
import { cis_router }  from "./src/routers/cissukl_router";

let port: number = 8000;

let app: express.Express = express();

/*
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:8000',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./src/routes/*.js'],
};

let swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
*/
app.use('/cissuklapi/v0', cis_router);
app.use('/cissuklapi/v0', ectd_router);

app.listen(port);

console.log('CisSuklApi: ' + port);


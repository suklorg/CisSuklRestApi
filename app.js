"use strict";
const express = require("express");
//var swaggerJSDoc = require('swagger-jsdoc');
const cissukl_ectd_router_1 = require("./src/routers/cissukl_ectd_router");
const cissukl_router_1 = require("./src/routers/cissukl_router");
let port = 8000;
let app = express();
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
app.use('/cissuklapi/v0', cissukl_router_1.cis_router);
app.use('/cissuklapi/v0', cissukl_ectd_router_1.ectd_router);
app.listen(port);
console.log('CisSuklApi: ' + port);
//# sourceMappingURL=app.js.map
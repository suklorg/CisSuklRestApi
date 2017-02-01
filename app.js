"use strict";
const express = require("express");
let swaggerJSDoc = require("swagger-jsdoc");
//import { swaggerJSDoc } from "swagger-jsdoc";
const cissukl_organizace_router_1 = require("./src/routers/cissukl_organizace_router");
const cissukl_reg_cisla_router_1 = require("./src/routers/cissukl_reg_cisla_router");
const cissukl_ciselniky_router_1 = require("./src/routers/cissukl_ciselniky_router");
const cissukl_lekarny_router_1 = require("./src/routers/cissukl_lekarny_router");
const cissukl_lp_router_1 = require("./src/routers/cissukl_lp_router");
const cissukl_dis13_router_1 = require("./src/routers/cissukl_dis13_router");
const cissukl_scau_router_1 = require("./src/routers/cissukl_scau_router");
let port = 8000;
let app = express();
///*
var swaggerDefinition = {
    info: {
        title: 'Číselníky SÚKL',
        version: '0.0.1',
        description: 'Popis RESTful API',
    },
    host: 'localhost:8000',
    //host: 'test-s-node:8000',
    //basePath: '/cissuklapi/v0',
    basePath: '/cissuklapi/v0',
};
// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./src/routers/*.js'],
};
let swaggerSpec = swaggerJSDoc(options);
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
console.log('dirname: ' + __dirname + '\\routes');
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
//*/
app.use('/cissuklapi/v1', cissukl_ciselniky_router_1.ciselniky_router);
app.use('/cissuklapi/v1', cissukl_reg_cisla_router_1.reg_cisla_router);
app.use('/cissuklapi/v1', cissukl_lekarny_router_1.lekarny_router);
app.use('/cissuklapi/v1', cissukl_lp_router_1.lp_router);
app.use('/cissuklapi/v1', cissukl_dis13_router_1.dis13_router);
app.use('/cissuklapi/v1', cissukl_organizace_router_1.organizace_router);
app.use('/cissuklapi/v1', cissukl_scau_router_1.scau_router);
app.listen(port);
console.log('CisSuklApi: ' + port);
//# sourceMappingURL=app.js.map
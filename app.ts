
import * as express from "express";
let swaggerJSDoc = require("swagger-jsdoc");
//import { swaggerJSDoc } from "swagger-jsdoc";

import { ectd_router }  from "./src/routers/cissukl_ectd_router";
import { cis_router }  from "./src/routers/cissukl_router";

let port: number = 8000;

let app: express.Express = express();

///*
var swaggerDefinition = {
    info: {
        title: 'Číselníky SÚKL',
        version: '0.0.1',
        description: 'Popis RESTful API',
    },
    host: 'test-s-node:8000',
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
//app.use(express.static(path.join(__dirname + '\\api_docs', 'public'))); 
app.use(express.static(path.join(__dirname , 'public'))); 
//console.log('dirname: ' + __dirname + '\\routes');
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
//*/
app.use('/cissuklapi/v0', cis_router);
app.use('/cissuklapi/v0', ectd_router);

app.listen(port);

console.log('CisSuklApi: ' + port);


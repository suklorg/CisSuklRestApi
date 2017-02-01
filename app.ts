
import * as express from "express";
let swaggerJSDoc = require("swagger-jsdoc");
//import { swaggerJSDoc } from "swagger-jsdoc";

import { organizace_router } from "./src/routers/cissukl_organizace_router";
import { reg_cisla_router } from  "./src/routers/cissukl_reg_cisla_router";
import { ciselniky_router }  from "./src/routers/cissukl_ciselniky_router";
import { lekarny_router } from "./src/routers/cissukl_lekarny_router";
import { lp_router } from "./src/routers/cissukl_lp_router";
import { dis13_router } from "./src/routers/cissukl_dis13_router";
import { scau_router } from "./src/routers/cissukl_scau_router";


let port: number = 8000;

let app: express.Express = express();

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
app.use(express.static(path.join(__dirname , 'public'))); 
console.log('dirname: ' + __dirname + '\\routes');
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
//*/
app.use('/cissuklapi/v1', ciselniky_router);
app.use('/cissuklapi/v1', reg_cisla_router);
app.use('/cissuklapi/v1', lekarny_router);
app.use('/cissuklapi/v1', lp_router);
app.use('/cissuklapi/v1', dis13_router);
app.use('/cissuklapi/v1', organizace_router);
app.use('/cissuklapi/v1', scau_router);

app.listen(port);

console.log('CisSuklApi: ' + port);


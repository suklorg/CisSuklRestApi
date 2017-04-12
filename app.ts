import * as bodyParser from "body-parser";
//var bodyParser = require('body-parser');
import * as express from "express";

import { organizace_router } from "./src/routers/cissukl_organizace_router";
import { reg_cisla_router } from  "./src/routers/cissukl_reg_cisla_router";
import { ciselniky_router }  from "./src/routers/cissukl_ciselniky_router";
import { lekarny_router } from "./src/routers/cissukl_lekarny_router";
import { lp_router } from "./src/routers/cissukl_lp_router";
import { dis13_router } from "./src/routers/cissukl_dis13_router";
import { scau_router } from "./src/routers/cissukl_scau_router";
import { cp_router } from "./src/routers/cissukl_cp_router";
import { FormatExceptionMessage, errMessage400 } from "./src/common";

let port: number = 8000;

let app: express.Express = express();


const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//console.log('dirname: ' + __dirname + '\\public\\docs\\index.html');
/*
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
//*/
app.use('/cissuklapi/v1', ciselniky_router);
app.use('/cissuklapi/v1', reg_cisla_router);
app.use('/cissuklapi/v1', lekarny_router);
app.use('/cissuklapi/v1', dis13_router);
app.use('/cissuklapi/v1', organizace_router);
app.use('/cissuklapi/v1', lp_router);
app.use('/cissuklapi/v1', scau_router);

app.use('/cissuklapi/v1', cp_router);


app.get('/docs', function (req: express.Request, res: express.Response): void {
    res.sendFile(__dirname + '\\public\\docs\\index.html');
});

app.get('*', function (req: express.Request, res: express.Response): void {
    res.status(400).send(FormatExceptionMessage(errMessage400));
});

app.listen(port);

console.log('CisSuklApi: ' + port);


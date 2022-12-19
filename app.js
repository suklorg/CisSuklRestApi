'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
//var bodyParser = require('body-parser');
const express = require("express");
const cissukl_organizace_router_1 = require("./src/routers/cissukl_organizace_router");
const cissukl_reg_cisla_router_1 = require("./src/routers/cissukl_reg_cisla_router");
const cissukl_ciselniky_router_1 = require("./src/routers/cissukl_ciselniky_router");
const cissukl_lekarny_router_1 = require("./src/routers/cissukl_lekarny_router");
const cissukl_lp_router_1 = require("./src/routers/cissukl_lp_router");
const cissukl_dis13_router_1 = require("./src/routers/cissukl_dis13_router");
const cissukl_scau_router_1 = require("./src/routers/cissukl_scau_router");
const cissukl_cp_router_1 = require("./src/routers/cissukl_cp_router");
const cissukl_pk_router_1 = require("./src/routers/cissukl_pk_router");
const cissukl_lp_sod_router_1 = require("./src/routers/cissukl_lp_sod_router");
const cissukl_lp_naz2_router_1 = require("./src/routers/cissukl_lp_naz2_router");
const cissukl_lp_bwl_router_1 = require("./src/routers/cissukl_lp_bwl_router");
const cissukl_cdnu_router_1 = require("./src/routers/cissukl_cdnu_router");
const cissukl_archiv_router_1 = require("./src/routers/cissukl_archiv_router");
const cissukl_distributori_router_1 = require("./src/routers/cissukl_distributori_router");
const common_1 = require("./src/common");
let port = 8080;
let app = express();
///*
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//*/
//console.log('dirname: ' + __dirname + '\\public\\docs\\index.html');
/*
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
//*/
app.use('/cissuklapi/v1', cissukl_ciselniky_router_1.ciselniky_router);
app.use('/cissuklapi/v1', cissukl_reg_cisla_router_1.reg_cisla_router);
app.use('/cissuklapi/v1', cissukl_lekarny_router_1.lekarny_router);
app.use('/cissuklapi/v1', cissukl_dis13_router_1.dis13_router);
app.use('/cissuklapi/v1', cissukl_organizace_router_1.organizace_router);
app.use('/cissuklapi/v1', cissukl_lp_router_1.lp_router);
app.use('/cissuklapi/v1', cissukl_scau_router_1.scau_router);
app.use('/cissuklapi/v1', cissukl_cp_router_1.cp_router);
app.use('/cissuklapi/v1', cissukl_pk_router_1.pk_router);
app.use('/cissuklapi/v1', cissukl_lp_sod_router_1.lp_sod_router);
app.use('/cissuklapi/v1', cissukl_lp_naz2_router_1.lp_naz2_router);
app.use('/cissuklapi/v1', cissukl_cdnu_router_1.cdnu_router);
app.use('/cissuklapi/v1', cissukl_lp_bwl_router_1.lp_bwl_router);
app.use('/cissuklapi/v1', cissukl_archiv_router_1.archiv_router);
app.use('/cissuklapi/v1', cissukl_distributori_router_1.distributori_router);
/*
app.get('/cissuklapi/vi', function (req: express.Request, res: express.Response): void {
    res.sendFile(__dirname + '\\public\\cissuklapi\\index.html');
});
*/
app.get('*', function (req, res) {
    res.status(400).send((0, common_1.FormatExceptionMessage)(common_1.errMessage400));
});
app.listen(port);
//CutomLogger.logger.info('CisSuklApi: ' + port);
//logger.info('CisSuklApi: ' + port);
//logger.debug('CisSuklApi: ' + port);
console.log('CisSuklApi: ' + port);
//# sourceMappingURL=app.js.map
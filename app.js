"use strict";
const express = require("express");
const cissukl_ectd_router_1 = require("./routers/cissukl_ectd_router");
const cissukl_router_1 = require("./routers/cissukl_router");
let port = 8000;
let app = express();
app.use('/cissuklapi', cissukl_router_1.cis_router);
app.use('/cissuklapi', cissukl_ectd_router_1.ectd_router);
app.listen(port);
console.log('CisSuklApi: ' + port);
//# sourceMappingURL=app.js.map
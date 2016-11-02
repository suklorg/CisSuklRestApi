
import * as express from "express";
import { ectd_router }  from "./src/routers/cissukl_ectd_router";
import { cis_router }  from "./src/routers/cissukl_router";

let port: number = 8000;

let app: express.Express = express();

app.use('/cissuklapi/v0', cis_router);
app.use('/cissuklapi/v0', ectd_router);

app.listen(port);

console.log('CisSuklApi: ' + port);


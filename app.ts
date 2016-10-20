
import * as express from "express";
import { ectd_router }  from "./routers/cissukl_ectd_router";
import { cis_router }  from "./routers/cissukl_router";

let port: number = 8000;

let app: express.Express = express();

app.use('/cissuklapi', cis_router);
app.use('/cissuklapi', ectd_router);

app.listen(port);

console.log('CisSuklApi: ' + port);


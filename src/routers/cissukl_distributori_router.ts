"use strict";

import * as express from "express";
import { FormatExceptionMessage, FormatException, errMessage400, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, SetHeader, OraProcedure, connectionAttributes, connectionAttributesDlp } from "../common";
import { IConnectionAttributes, IExecuteOptions, IConnection, getConnection, OBJECT, NUMBER, STRING, DATE, CURSOR, BIND_IN, BIND_OUT } from "oracledb";

let distributori_router: express.Router = express.Router();

distributori_router.get('/distributori', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;
    let oraProcedure: OraProcedure;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcedure = new OraProcedure(oraProcs.getDistributori);
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
        }
        else if (typeof req.query.ico !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new OraProcedure(oraProcs.getDistributoriIco);
            oraProcedure.procParams.ico.val = req.query.ico;
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
        }
        else if (typeof req.query.nazev != "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new OraProcedure(oraProcs.getDistributoriNazev);
            oraProcedure.procParams.nazev.val = req.query.nazev;
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
        }

        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(FormatExceptionMessage(errMessage400))
        }
    } catch (e) {
        if (e instanceof AppError) {
            res.status(e.status).send(FormatExceptionMessage(e.message));
        }
        else {
            res.status(400).send(FormatExceptionMessage(e.message));
        };
        console.log(e.message);
    }

});



export { distributori_router };

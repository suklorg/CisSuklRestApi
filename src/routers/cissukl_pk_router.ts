"use strict";

import * as express from "express";
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
import { FormatExceptionMessage, FormatException, errMessage400, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, defLimit, defOffset, SetHeader } from "../common";
import * as cis from "../common";

//let oracledb = require('oracledb');

let pk_router: express.Router = express.Router();


pk_router.get('/paralelnikody', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    //oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];

    try {
        SetHeader(res);

        if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcs.getParalelniKodyKodSuklScau.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getParalelniKodyKodSuklScau);
        }

        if (typeof oraExecuteResult !== "undefined") {

            res.setHeader('X-Total-Count', oraExecuteResult.totalCount.toString());
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


pk_router.get('/paralelnikody/:kodSukl', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getParalelniKodyKodSuklScau.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getParalelniKodyKodSuklScau);
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



export { pk_router };


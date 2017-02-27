"use strict";

import * as express from "express";
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
import { FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, SetHeader } from "../common";
import * as cis from "../common";
 
let lekarny_router: express.Router = express.Router();


lekarny_router.get('/lekarny', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: cis.IOraExecuteResult;

    try {
        /*
        res.type('application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        */
        SetHeader(res);


        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekarny);
        }
        else if (typeof req.query.status !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcs.getLekarnyStatus.procParams.status.val = req.query.status;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekarnyStatus);
        }

        else if (req.query.fields === "kod_pracoviste" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekarnyKody);
        }

        else if (req.query.fields === "kod_pracoviste" && Object.keys(req.query).length === 2 && typeof req.query.status !== "undefined" ) {
            oraProcs.getLekarnyKodyStatus.procParams.status.val = req.query.status;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekarnyKodyStatus);
        }
/*
        else if (typeof req.query.kod_pracoviste !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcs.getLekarnyKodPracoviste.procParams.kod_pracoviste.val = req.query.kod_pracoviste;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekarnyKodPracoviste);
        }
*/

        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(FormatExceptionMessage(errMessage400))
        }
    } catch (e) {
        if (e instanceof cis.AppError) {
            res.status(e.status).send(FormatExceptionMessage(e.message));
        }
        else {
            res.status(400).send(FormatExceptionMessage(e.message));
        };
        console.log(e.message);
    }

});


lekarny_router.get('/lekarny/:kod_pracoviste', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: cis.IOraExecuteResult;

    try {

        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getLekarnyKodPracoviste.procParams.kod_pracoviste.val = req.params.kod_pracoviste;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekarnyKodPracoviste);
        }

        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(FormatExceptionMessage(errMessage400))
        }
    } catch (e) {
        if (e instanceof cis.AppError) {
            res.status(e.status).send(FormatExceptionMessage(e.message));
        }
        else {
            res.status(400).send(FormatExceptionMessage(e.message));
        };
        console.log(e.message);
    }

});



//*/
export { lekarny_router };

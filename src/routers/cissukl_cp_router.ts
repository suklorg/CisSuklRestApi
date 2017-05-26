"use strict";

import * as express from "express";
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
import { FormatExceptionMessage, FormatException, errMessage400, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, defLimit, defOffset, SetHeader } from "../common";
import * as cis from "../common";

//let oracledb = require('oracledb');

let cp_router: express.Router = express.Router();


cp_router.get('/cenypuvodce', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    //oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];

    try {
        SetHeader(res);

        //
        // /cenypuvodce
        //
        if (Object.keys(req.query).length === 0) {
            oraProcs.getCenyPuvodce.procParams.offset.val = defOffset;
            oraProcs.getCenyPuvodce.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodce);
        }
        //
        //// /cenypuvodce?kod_sukl={kod_sukl}
        //
        else if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcs.getCenyPuvodceKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodceKodSukl);
        }
        //
        //// /cenypuvodce?kod_sukl={kod_sukl}&obdobi={obdobi}
        //
        /*
        else if (typeof req.query.kod_sukl !== "undefined" && typeof req.query.obdobi !== "undefined" && Object.keys(req.query).length === 2) {
            oraProcs.getCenyPuvodceKodSuklObdobi.procParams.kod_sukl.val = req.query.kod_sukl;
            oraProcs.getCenyPuvodceKodSuklObdobi.procParams.obdobi.val = req.query.obdobi;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodceKodSuklObdobi);
        }
        */
        //
        //// ?fields=...
        //
        else if (typeof req.query.fields !== "undefined") {
            //
            //// ?fields=kod_sukl
            //
            if (req.query.fields === "kod_sukl") {

                //
                // /cenypuvodce?fields=kod_sukl
                //
                if (Object.keys(req.query).length === 1) {
                    oraProcs.getCenyPuvodceKody.procParams.offset.val = defOffset;
                    oraProcs.getCenyPuvodceKody.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodceKody);
                }
                //
                // /cenypuvodce?fields=kod_sukl&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getCenyPuvodceKody.procParams.offset.val = defOffset;
                    oraProcs.getCenyPuvodceKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodceKody);
                }
                //
                // /cenypuvodce?fields=kod_sukl&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getCenyPuvodceKody.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getCenyPuvodceKody.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodceKody);
                }
                //
                // /cenypuvodce?fields=kod_sukl&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getCenyPuvodceKody.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getCenyPuvodceKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodceKody);

                }
            }
        }
        //
        //// NENI ?fields=kod_sukl
        //-----------------------------------------------------------------
        else {

            //
            // /cenypuvodce?limit={limit}
            //
            if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                oraProcs.getCenyPuvodce.procParams.offset.val = defOffset;
                oraProcs.getCenyPuvodce.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodce);
            }
            //
            // /cenypuvodce?offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                oraProcs.getCenyPuvodce.procParams.offset.val = Number(req.query.offset);
                oraProcs.getCenyPuvodce.procParams.limit.val = defLimit;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodce);
            }
            //
            // /cenypuvodce?limit={limit}&offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                oraProcs.getCenyPuvodce.procParams.offset.val = Number(req.query.offset);
                oraProcs.getCenyPuvodce.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodce);

            }
            //*/
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


cp_router.get('/cenypuvodce/:kodSukl', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getCenyPuvodceKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodceKodSukl);
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



export { cp_router };


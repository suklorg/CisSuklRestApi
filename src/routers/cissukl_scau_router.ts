"use strict";

import * as express from "express";
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
import { FormatExceptionMessage, FormatException, errMessage400, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, defLimit, defOffset, SetHeader } from "../common";
import * as cis from "../common";

//let oracledb = require('oracledb');

let scau_router: express.Router = express.Router();


scau_router.get('/scau', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    //oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];

    try {
        SetHeader(res);

        //
        // /scau
        //
        if (Object.keys(req.query).length === 0) {
            oraProcs.getScau.procParams.offset.val = defOffset;
            oraProcs.getScau.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getScau);
        }
        //
        //// /scau?kod_sukl={kod_sukl}
        //
        else if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcs.getScauKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getScauKodSukl);
        } 
        //
        //// /scau?kod_sukl={kod_sukl}&obdobi={obdobi}
        //
        else if (typeof req.query.kod_sukl !== "undefined" && typeof req.query.obdobi !== "undefined" && Object.keys(req.query).length === 2) {
            oraProcs.getScauKodSuklObdobi.procParams.kod_sukl.val = req.query.kod_sukl;
            oraProcs.getScauKodSuklObdobi.procParams.obdobi.val = req.query.obdobi;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getScauKodSuklObdobi);
        } 
        //
        //// ?fields=...
        //
        else if (typeof req.query.fields !== "undefined") {
            //
            //// ?fields=kod_sukl
            //
            if (req.query.fields === "kod_sukl") {

                //
                // /scau?fields=kod_sukl
                //
                if (Object.keys(req.query).length === 1) {
                    oraProcs.getScauKody.procParams.offset.val = defOffset;
                    oraProcs.getScauKody.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getScauKody);
                }
                //
                // /scau?fields=kod_sukl&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getScauKody.procParams.offset.val = defOffset;
                    oraProcs.getScauKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getScauKody);
                }
                //
                // /scau?fields=kod_sukl&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getScauKody.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getScauKody.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getScauKody);
                }
                //
                // /scau?fields=kod_sukl&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getScauKody.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getScauKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getScauKody);

                }
            }
        }
        //
        //// NENI ?fields=kod_sukl
        //-----------------------------------------------------------------
        else {

            //
            // /scau?limit={limit}
            //
            if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                oraProcs.getScau.procParams.offset.val = defOffset;
                oraProcs.getScau.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getScau);
            }
            //
            // /scau?offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                oraProcs.getScau.procParams.offset.val = Number(req.query.offset);
                oraProcs.getScau.procParams.limit.val = defLimit;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getScau);
            }
            //
            // /scau?limit={limit}&offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                oraProcs.getScau.procParams.offset.val = Number(req.query.offset);
                oraProcs.getScau.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getScau);

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


scau_router.get('/scau/:kodSukl', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getScauKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getScauKodSukl);
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



export { scau_router };


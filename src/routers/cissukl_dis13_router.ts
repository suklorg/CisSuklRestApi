"use strict";

import * as express from "express";
import { FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult } from "../common";

let dis13_router: express.Router = express.Router();


dis13_router.get('/dodavky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        res.type('application/json');

        if (req.query.fields === "kod_sukl") {

            if (Object.keys(req.query).length === 1) {
                oraProcs.getDis13Kody.procParams.offset.val = 0;
                oraProcs.getDis13Kody.procParams.limit.val = 20;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getDis13Kody);
            }
            else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                oraProcs.getDis13Kody.procParams.offset.val = 0;
                oraProcs.getDis13Kody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getDis13Kody);
            }
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                oraProcs.getDis13Kody.procParams.offset.val = Number(req.query.offset);
                oraProcs.getDis13Kody.procParams.limit.val = 20;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getDis13Kody);
            }
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                oraProcs.getDis13Kody.procParams.offset.val = Number(req.query.offset);
                oraProcs.getDis13Kody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getDis13Kody);

            }
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


export { dis13_router };

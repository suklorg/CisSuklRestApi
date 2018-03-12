"use strict";

import * as express from "express";
import { FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, defLimit, defOffset, SetHeader } from "../common";

let lp_naz2_router: express.Router = express.Router();


lp_naz2_router.get('/lecivepripravky2', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);
        //res.type('application/json');
        //
        // /lecivepripravky2
        //
        if (Object.keys(req.query).length === 0) {
            oraProcs.getLecivePripravky2.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky2.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2);
        }

        //
        //// lecivepripravky2?limit={limit}
        //
        else if ((typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravky2.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky2.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2);
        }
        //
        //// lecivepripravky2?offset={offset}
        //
        else if ((typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravky2.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravky2.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2);
        }
        //
        //// lecivepripravky2?limit={limit}&offset={offset}
        //
        else if ((typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravky2.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravky2.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2);
        }

        //
        //// lecivepripravky2?kod_sukl={kod_sukl}
        //
        else if ((typeof req.query.kod_sukl !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravky2KodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2KodSukl);
        }
        //
        //// lecivepripravky2?fields=kod_sukl
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravky2Kody.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky2Kody.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2Kody);
        }
        //
        //// lecivepripravky2?fields=kod_sukl&limit={limit}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravky2Kody.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky2Kody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2Kody);
        }
        //
        //// lecivepripravky2?fields=kod_sukl&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravky2Kody.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravky2Kody.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2Kody);
        }
        //
        //// lecivepripravky2?fields=kod_sukl&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            oraProcs.getLecivePripravky2Kody.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravky2Kody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky2Kody
            );
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



export { lp_naz2_router };

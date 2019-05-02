"use strict";

import * as express from "express";
import { FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, defLimit, defOffset, SetHeader } from "../common";

let lp_bwl_router: express.Router = express.Router();




lp_bwl_router.get('/lecivepripravky3', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);
        //res.type('application/json');
        //
        // /lecivepripravky3
        //
        if (Object.keys(req.query).length === 0) {
            oraProcs.getLecivePripravky3.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky3.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3);
        }

        //
        //// lecivepripravky3?limit={limit}
        //
        else if ((typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravky3.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky3.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3);
        }
        //
        //// lecivepripravky3?offset={offset}
        //
        else if ((typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravky3.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravky3.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3);
        }
        //
        //// lecivepripravky3?limit={limit}&offset={offset}
        //
        else if ((typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravky3.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravky3.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3);
        }

        //
        //// lecivepripravky3?kod_sukl={kod_sukl}
        //
        else if ((typeof req.query.kod_sukl !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravky3KodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3KodSukl);
        }
        //
        //// lecivepripravky3?fields=kod_sukl
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravky3Kody.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky3Kody.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3Kody);
        }
        //
        //// lecivepripravky3?fields=kod_sukl&limit={limit}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravky3Kody.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky3Kody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3Kody);
        }
        //
        //// lecivepripravky3?fields=kod_sukl&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravky3Kody.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravky3Kody.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3Kody);
        }
        //
        //// lecivepripravky3?fields=kod_sukl&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            oraProcs.getLecivePripravky3Kody.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravky3Kody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky3Kody
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



export { lp_bwl_router };

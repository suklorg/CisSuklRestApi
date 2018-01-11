"use strict";

import * as express from "express";
import { FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, defLimit, defOffset, SetHeader } from "../common";

let lp_sod_router: express.Router = express.Router();


lp_sod_router.get('/sodlecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);
        //res.type('application/json');
        //
        // /sodlecivepripravky
        //
        if (Object.keys(req.query).length === 0) {
            oraProcs.getSodLecivePripravky.procParams.offset.val = defOffset;
            oraProcs.getSodLecivePripravky.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravky);
        }
        
        //
        //// sodlecivepripravky?limit={limit}
        //
        else if ((typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getSodLecivePripravky.procParams.offset.val = defOffset;
            oraProcs.getSodLecivePripravky.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravky);
        }
        //
        //// sodlecivepripravky?offset={offset}
        //
        else if ((typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getSodLecivePripravky.procParams.offset.val = Number(req.query.offset);
            oraProcs.getSodLecivePripravky.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravky);
        }
        //
        //// sodlecivepripravky?limit={limit}&offset={offset}
        //
        else if ((typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getSodLecivePripravky.procParams.offset.val = Number(req.query.offset);
            oraProcs.getSodLecivePripravky.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravky);
        }

        //
        //// sodlecivepripravky?kod_sukl={kod_sukl}
        //
        else if ((typeof req.query.kod_sukl !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getSodLecivePripravkyKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravkyKodSukl);
        }
        //
        //// sodlecivepripravky?fields=kod_sukl
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") && (Object.keys(req.query).length === 1)) {
            oraProcs.getSodLecivePripravkyKody.procParams.offset.val = defOffset;
            oraProcs.getSodLecivePripravkyKody.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravkyKody);
        }
        //
        //// sodlecivepripravky?fields=kod_sukl&limit={limit}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getSodLecivePripravkyKody.procParams.offset.val = defOffset;
            oraProcs.getSodLecivePripravkyKody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravkyKody);
        }
        //
        //// sodlecivepripravky?fields=kod_sukl&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getSodLecivePripravkyKody.procParams.offset.val = Number(req.query.offset);
            oraProcs.getSodLecivePripravkyKody.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravkyKody);
        }
        //
        //// sodlecivepripravky?fields=kod_sukl&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            oraProcs.getSodLecivePripravkyKody.procParams.offset.val = Number(req.query.offset);
            oraProcs.getSodLecivePripravkyKody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSodLecivePripravkyKody
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



export { lp_sod_router };

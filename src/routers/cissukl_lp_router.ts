"use strict";

import * as express from "express";
import { FormatExceptionMessage, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult } from "../common";

let lp_router: express.Router = express.Router();

/*
lp_router.get('/lecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            res.send(await GetLecivePripravky());
        }
        else if (req.query.fields === "kod_sukl" && Object.keys(req.query).length === 1) {
            res.send(await GetLecivePripravkyKody());
        } else {
            res.status(404).send(FormatExceptionMessage("Pro dané URL není služba implementována."));
        }

    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
    }

});
*/

lp_router.get('/lecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        res.type('application/json');

        if (Object.keys(req.query).length === 0) {
            oraProcs.getLecivePripravky.procParams.offset.val = 0;
            oraProcs.getLecivePripravky.procParams.limit.val = 20;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky);
        }
        else if (typeof req.query.fields !== "undefined") {

            if (Object.keys(req.query).length === 1) {
                oraProcs.getLecivePripravkyKody.procParams.offset.val = 0;
                oraProcs.getLecivePripravkyKody.procParams.limit.val = 20;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKody);
            }
            else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                oraProcs.getLecivePripravkyKody.procParams.offset.val = 0;
                oraProcs.getLecivePripravkyKody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKody);
            }
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                oraProcs.getLecivePripravkyKody.procParams.offset.val = Number(req.query.offset);
                oraProcs.getLecivePripravkyKody.procParams.limit.val = 20;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKody);
            }
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                oraProcs.getLecivePripravkyKody.procParams.offset.val = Number(req.query.offset);
                oraProcs.getLecivePripravkyKody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKody);
            }
        }
        else {

            if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                oraProcs.getLecivePripravky.procParams.offset.val = 0;
                oraProcs.getLecivePripravky.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky);
            }
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                oraProcs.getLecivePripravky.procParams.offset.val = Number(req.query.offset);
                oraProcs.getLecivePripravky.procParams.limit.val = 20;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky);
            }
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                oraProcs.getLecivePripravky.procParams.offset.val = Number(req.query.offset);
                oraProcs.getLecivePripravky.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky);

            }
        }
        //*/

        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.totalCount.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(FormatExceptionMessage("Pro dané URL není služba implementována."))
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


lp_router.get('/neregistrovanelecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        res.type('application/json');

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getNeregistrovaneLecivePripravky);
        }
        else if (typeof req.query.obdobi_od !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcs.getNeregistrovaneLecivePripravkyObdobiOd.procParams.obdobi_od.val = req.query.obdobi_od;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getNeregistrovaneLecivePripravkyObdobiOd);
        }


        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(FormatExceptionMessage("Pro dané URL není služba implementována."))
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




export { lp_router };

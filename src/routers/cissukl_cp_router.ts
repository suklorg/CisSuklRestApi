"use strict";

import * as express from "express";
import { FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult } from "../common";

let cp_router: express.Router = express.Router();


cp_router.post('/cp', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {

        let body: string = JSON.stringify(req.body);
        let bodyObj: object = JSON.parse("{\"organizace\": \"SUKL test\",\"hlaseni\": [{\"kod_sukl\": \"0000100\",\"cena_puvodce\": \"100\"},{\"kod_sukl\": \"0000200\",\"cena_puvodce\":\"200\"}]}");
        res.sendStatus(200);


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

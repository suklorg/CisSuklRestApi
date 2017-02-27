"use strict";

import * as express from "express";
import { defLimit, defOffset, FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult , SetHeader} from "../common";


let organizace_router: express.Router = express.Router();

organizace_router.get('/organizace', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);
        //
        // /organizace
        //
        if (Object.keys(req.query).length === 0) {
            oraProcs.getOrganizace.procParams.offset.val = defOffset;
            oraProcs.getOrganizace.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizace);
        }
        //
        //// ?fields=kod_organizace
        //
        else if (typeof req.query.fields !== "undefined") {
            //
            // /organizace?fields=kod_organizace
            //
            if (Object.keys(req.query).length === 1) {
                oraProcs.getOrganizaceKody.procParams.offset.val = defOffset;
                oraProcs.getOrganizaceKody.procParams.limit.val = defLimit;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKody);
            }
            //
            //// ?fields=kod_organizace&je_drzitel={je_drzitel}
            //
            else if (typeof req.query.je_drzitel !== "undefined") {
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}
                //
                if (Object.keys(req.query).length === 2) {
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = defOffset;
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodyJeDrzitel);
                }
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = defOffset;
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodyJeDrzitel);
                }
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodyJeDrzitel);
                }
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodyJeDrzitel);
                }
            }
            //
            //// ?fields=kod_organizace&je_vyrobce={je_vyrobce}
            //
            else if (typeof req.query.je_vyrobce !== "undefined") {
                //
                // /organizace?fields=kod_organizace&je_vyrobce={je_vyrobce}
                //
                if (Object.keys(req.query).length === 2) {
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = defOffset;
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodyJeVyrobce);
                }
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_vyrobce}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = defOffset;
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodyJeVyrobce);
                }
                //
                // /organizace?fields=kod_organizace&je_vyrobce={je_vyrobce}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodyJeVyrobce);
                }
                //
                // /organizace?fields=kod_organizace&je_vyrobce={je_vyrobce}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodyJeVyrobce);
                }
            }
        
            //
            // /organizace?fields=kod_organizace&limit={limit}
            //
            else if ((typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) ) {
                oraProcs.getOrganizaceKody.procParams.offset.val = defOffset;
                oraProcs.getOrganizaceKody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKody);
            }
            //
            // /organizace?fields=kod_organizace&offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                oraProcs.getOrganizaceKody.procParams.offset.val = Number(req.query.offset);
                oraProcs.getOrganizaceKody.procParams.limit.val = defLimit;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKody);
            }
            //
            // /organizace?fields=kod_organizace&limit={limit}&offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                oraProcs.getOrganizaceKody.procParams.offset.val = Number(req.query.offset);
                oraProcs.getOrganizaceKody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKody);
            }
        }
        //
        //// NENI ?fields=kod_organizace
        //-----------------------------------------------------------------
        else {
            //
            //// &je_drzitel={je_drzitel}
            //

            if (typeof req.query.je_drzitel !== "undefined") {
                //
                // /organizace?je_drzitel={je_drzitel}
                //
                if (Object.keys(req.query).length === 1) {
                    oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = defOffset;
                    oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceJeDrzitel);
                }
                //
                // /organizace?je_drzitel={je_drzitel}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = defOffset;
                    oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceJeDrzitel);
                }
                //
                // /organizace?je_drzitel={je_drzitel}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceJeDrzitel);
                }
                //
                // /organizace?je_drzitel={je_drzitel}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceJeDrzitel);
                }
            }
            //
            //// &je_vyrobce={je_vyrobce}
            //
            else if (typeof req.query.je_vyrobce !== "undefined") {
                //
                // /organizace?je_vyrobce={je_vyrobce}
                //
                if (Object.keys(req.query).length === 1) {
                    oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = defOffset;
                    oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceJeVyrobce);
                }

                //
                // /organizace?je_drzitel={je_vyrobce}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = defOffset;
                    oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceJeVyrobce);
                }
                //
                // /organizace?je_vyrobce={je_vyrobce}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceJeVyrobce);
                }
                //
                // /organizace?je_vyrobce={je_vyrobce}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceJeVyrobce);
                }
            }
            else {
                //
                // /organizace?limit={limit}
                //
                if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                    oraProcs.getOrganizace.procParams.offset.val = defOffset;
                    oraProcs.getOrganizace.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizace);
                }
                //
                // /organizace?offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                    oraProcs.getOrganizace.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizace.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizace);
                }
                //
                // /organizace?limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getOrganizace.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getOrganizace.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizace);
                }
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

organizace_router.get('/organizace/:kodOrganizace', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getOrganizaceKodOrganizace.procParams.kod_organizace.val = req.params.kodOrganizace;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getOrganizaceKodOrganizace);
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


export { organizace_router };
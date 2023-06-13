"use strict";

import * as express from "express";
import { FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, defLimit, defOffset, SetHeader, OraProcedure } from "../common";

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
            res.status(404).send(FormatExceptionMessage(errMessage400));
        }

    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
    }

});
*/

lp_router.get('/lecivepripravky/:kodSukl', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    let oraProcedure: OraProcedure = new OraProcedure(oraProcs.getLecivePripravkyKodSukl);


    try {
        SetHeader(res);
        //res.type('application/json');

        if (Object.keys(req.query).length === 0) {
            /*
            oraProcs.getLecivePripravkyKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodSukl);
            */
            //*
            oraProcedure.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
            //*/
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





lp_router.get('/lecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    let oraProcedure: OraProcedure; // = new OraProcedure(oraProcs.getLecivePripravkyKodSukl);

    try {
        SetHeader(res);
        //// lecivepripravky?registracni_cislo={registracni_cislo}
        //
        if ((typeof req.query.registracni_cislo !== "undefined") && (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravkyRegCislo.procParams.registracni_cislo.val = req.query.registracni_cislo;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyRegCislo);
        }



        //res.type('application/json');
        //
        // /lecivepripravky
        //


        else if (Object.keys(req.query).length === 0) {
            oraProcs.getLecivePripravky.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravky.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky);
        }
        //
        //// lecivepripravky?kod_sukl={kod_sukl}&stavy_registrace=stavy_registrace_scau
        //
        else if ((typeof req.query.kod_sukl !== "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (Object.keys(req.query).length === 2)) {
            oraProcedure = new OraProcedure(oraProcs.getLecivePripravkyKodSuklSRegScau);
            oraProcedure.procParams.kod_sukl.val = req.query.kod_sukl;
            //oraProcedure.procParams.stavy_registrace.val = req.query.stavy_registrace;
            
            
            //oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodSuklSRegScau);
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
        }


        //
        //// lecivepripravky?stavy_registrace=stavy_registrace_scau
        //
        else if ((typeof req.query.fields === "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
                 (Object.keys(req.query).length === 1)) {
            oraProcs.getLecivePripravkySRegScau.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravkySRegScau.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkySRegScau);
        }
        //
        //// lecivepripravky?stavy_registrace=stavy_registrace_scau&limit={limit}
        //
        else if ((typeof req.query.fields === "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
                 (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravkySRegScau.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravkySRegScau.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkySRegScau);
        }
        //
        //// lecivepripravky?stavy_registrace=stavy_registrace_scau&offset={offset}
        //
        else if ((typeof req.query.fields === "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravkySRegScau.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravkySRegScau.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkySRegScau);
        }
        //
        //// lecivepripravky?stavy_registrace=stavy_registrace_scau&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields === "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            oraProcs.getLecivePripravkySRegScau.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravkySRegScau.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkySRegScau);
        }
///
        //
        //// lecivepripravky?fields=kod_sukl&stavy_registrace=stavy_registrace_scau
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (Object.keys(req.query).length === 2)) {
            oraProcs.getLecivePripravkyKodySRegScau.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravkyKodySRegScau.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodySRegScau);
        }
        //
        //// lecivepripravky?fields=kod_sukl&stavy_registrace=stavy_registrace_scau&limit={limit}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 3)) {
            oraProcs.getLecivePripravkyKodySRegScau.procParams.offset.val = defOffset;
            oraProcs.getLecivePripravkyKodySRegScau.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodySRegScau);
        }
        //
        //// lecivepripravky?fields=kod_sukl&stavy_registrace=stavy_registrace_scau&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            oraProcs.getLecivePripravkyKodySRegScau.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravkyKodySRegScau.procParams.limit.val = defLimit;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodySRegScau);
        }
        //
        //// lecivepripravky?fields=kod_sukl&stavy_registrace=stavy_registrace_scau&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 4)) {
            oraProcs.getLecivePripravkyKodySRegScau.procParams.offset.val = Number(req.query.offset);
            oraProcs.getLecivePripravkyKodySRegScau.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodySRegScau);
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
                // /lecivepripravky?fields=kod_sukl
                //
                if (Object.keys(req.query).length === 1) {
                    oraProcs.getLecivePripravkyKody.procParams.offset.val = defOffset;
                    oraProcs.getLecivePripravkyKody.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKody);
                }
                //
                //// ?fields=kod_sukl&je_regulovany={je_regulovany}
                //
                else if (typeof req.query.je_regulovany !== "undefined") {
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}
                    //
                    if (Object.keys(req.query).length === 2) {
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = defOffset;
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = defLimit;
                        oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}&limit={limit}
                    //
                    else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = defOffset;
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}&offset={offset}
                    //
                    else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = Number(req.query.offset);
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = defLimit;
                        oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}&limit={limit}&offset={offset}
                    //
                    else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = Number(req.query.offset);
                        oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                }
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}
                //

                else if (typeof req.query.platnost_od !== "undefined") {
                    //
                    //// ?fields=kod_sukl&platnost_od={platnost_od}
                    //
                    if (Object.keys(req.query).length === 2) {
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = defOffset;
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = defLimit;
                        oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    //
                    //// ?fields=kod_sukl&platnost_od={platnost_od}&limit={limit}
                    //
                    else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = defOffset;
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    //
                    //// ?fields=kod_sukl&platnost_od={platnost_od}&offset={offset}
                    //
                    else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = defLimit;
                        oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    //
                    //// ?fields=kod_sukl&platnost_od={platnost_od}&limit={limit}&offset={offset}
                    //
                    else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                        oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                }
                //
                // /lecivepripravky?fields=kod_sukl&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getLecivePripravkyKody.procParams.offset.val = defOffset;
                    oraProcs.getLecivePripravkyKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKody);
                }
                //
                // /lecivepripravky?fields=kod_sukl&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getLecivePripravkyKody.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getLecivePripravkyKody.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKody);
                }
                //
                // /lecivepripravky?fields=kod_sukl&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getLecivePripravkyKody.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getLecivePripravkyKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKody);

                }
            }
        }
        //
        //// NENI ?fields=kod_sukl
        //-----------------------------------------------------------------
        else {

            if (typeof req.query.platnost_od !== "undefined") {
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}
                //
                if (Object.keys(req.query).length === 1) {
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = defOffset;
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyPlatnostOd);
                }
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = defOffset;
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyPlatnostOd);
                }
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyPlatnostOd);
                }
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyPlatnostOd);
                }
            }          ///////
            //
            // /lecivepripravky?
            //

            else {
                //
                // /lecivepripravky?limit={limit}
                //
                if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                    oraProcs.getLecivePripravky.procParams.offset.val = defOffset;
                    oraProcs.getLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky);
                }
                //
                // /lecivepripravky?offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                    oraProcs.getLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getLecivePripravky.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky);
                }
                //
                // /lecivepripravky?limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravky);

                }
            }
        }
        
        //*/

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

lp_router.get('/lecivepripravky/:kodSukl', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    let oraProcedure: OraProcedure = new OraProcedure(oraProcs.getLecivePripravkyKodSukl);
    

    try {
        SetHeader(res);
        //res.type('application/json');

        if (Object.keys(req.query).length === 0) {
            /*
            oraProcs.getLecivePripravkyKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodSukl);
            */
            //*
            oraProcedure.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
            //*/
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




lp_router.get('/neregistrovanelecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);
        //res.type('application/json');

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


lp_router.get('/ukoncenaregistracelecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);
        //res.type('application/json');

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


lp_router.get('/slozenilecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcs.getSlozeniLecivePripravkyKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getSlozeniLecivePripravkyKodSukl);
        } else {
            //
            // /slozenilecivepripravky
            //
            if (Object.keys(req.query).length === 0) {
                oraProcs.getSlozeniLecivePripravky.procParams.offset.val = defOffset;
                oraProcs.getSlozeniLecivePripravky.procParams.limit.val = defLimit;
                oraExecuteResult = await ExecuteProcedure(oraProcs.getSlozeniLecivePripravky);
            } else {
                //
                // /slozenilecivepripravky?limit={limit}
                //
                if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                    oraProcs.getSlozeniLecivePripravky.procParams.offset.val = defOffset;
                    oraProcs.getSlozeniLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getSlozeniLecivePripravky);
                }
                //
                // /slozenilecivepripravky?offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                    oraProcs.getSlozeniLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getSlozeniLecivePripravky.procParams.limit.val = defLimit;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getSlozeniLecivePripravky);
                }
                //
                // /slozenilecivepripravky?limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    oraProcs.getSlozeniLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    oraProcs.getSlozeniLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getSlozeniLecivePripravky);

                }
            }
        }
/////

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

export { lp_router };

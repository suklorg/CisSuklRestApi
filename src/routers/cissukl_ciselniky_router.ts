"use strict";

import * as express from "express";
import { FormatExceptionMessage, FormatException, errMessage400, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, SetHeader, OraProcedure } from "../common";


let ciselniky_router: express.Router = express.Router();
/*
ciselniky_router.get('/docs', async (req: express.Request, res: express.Response): Promise<void> => {
    res.sendFile(__dirname + '\\public\\docs\\index.html');
});
*/

ciselniky_router.get('/obaly', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;
    let oraProcedure: OraProcedure;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcedure = new OraProcedure(oraProcs.getObaly);
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
        }
        else if (req.query.fields === "kod_obal" && Object.keys(req.query).length === 1) {
            oraProcedure = new OraProcedure(oraProcs.getObalyKody);
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
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


ciselniky_router.get('/obaly/:kodObal', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;
    let oraProcedure: OraProcedure = new OraProcedure(oraProcs.getObalyKodObal);

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcedure.procParams.kod_obal.val = req.params.kodObal;
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
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



ciselniky_router.get('/cestypodani', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCestyPodani);
        }
        else if (req.query.fields === "kod_cesta_podani" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCestyPodaniKody);
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


ciselniky_router.get('/cestypodani/:kodCestaPodani', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getCestyPodaniKodCestaPodani.procParams.kod_cesta_podani.val = req.params.kodCestaPodani;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCestyPodaniKodCestaPodani);
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



ciselniky_router.get('/lekoveformy', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekoveFormy);
        }
        else if (req.query.fields === "kod_lekova_forma" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekoveFormyKody);
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


ciselniky_router.get('/lekoveformy/:kodLekovaForma', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getLekoveFormyKodLekovaForma.procParams.kod_lekova_forma.val = req.params.kodLekovaForma;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLekoveFormyKodLekovaForma);
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


ciselniky_router.get('/registracniprocedury', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getRegistracniProcedury);
        }
        else if (req.query.fields === "kod_registracni_procedura" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getRegistracniProceduryKody);
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


ciselniky_router.get('/registracniprocedury/:kodRegistracniProcedura', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getRegistracniProceduryKodRegistracniProcedura.procParams.kod_registracni_procedura.val = req.params.kodRegistracniProcedura;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getRegistracniProceduryKodRegistracniProcedura);
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



ciselniky_router.get('/indikacniskupiny', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getIndikacniSkupiny);
        }
        else if (req.query.fields === "kod_indikacni_skupina" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getIndikacniSkupinyKody);
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




ciselniky_router.get('/ucinnelatky', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getUcinneLatky);
        }
        else if (req.query.fields === "kod_ucinna_latka" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getUcinneLatkyKody);
        }
//        else if (typeof req.query.obdobi_od !== "undefined" && Object.keys(req.query).length === 1) {

        else if (req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcs.getUcinneLatkyKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getUcinneLatkyKodSukl);
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


ciselniky_router.get('/ucinnelatky/:kodUcinnaLatka', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getUcinneLatkyKodUcinnaLatka.procParams.kod_ucinna_latka.val = req.params.kodUcinnaLatka;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getUcinneLatkyKodUcinnaLatka);
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

///
ciselniky_router.get('/atcskupiny', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getAtcSkupiny);
        }
        else if (req.query.fields === "kod_atc_skupina" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getAtcSkupinyKody);
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


ciselniky_router.get('/atcskupiny/:kodAtcSkupina', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getAtcSkupinyKodAtcSkupina.procParams.kod_atc_skupina.val = req.params.kodAtcSkupina;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getAtcSkupinyKodAtcSkupina);
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



ciselniky_router.get('/indikacniskupiny', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getIndikacniSkupiny);
        }
        else if (req.query.fields === "kod_indikacni_skupina" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getIndikacniSkupinyKody);
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


ciselniky_router.get('/indikacniskupiny/:kodIndikacniSkupina', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getIndikacniSkupinyKodIndikacniSkupina.procParams.kod_indikacni_skupina.val = req.params.kodIndikacniSkupina;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getIndikacniSkupinyKodIndikacniSkupina);
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



ciselniky_router.get('/stavyregistrace', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getStavyRegistrace);
        }
        else if (req.query.fields === "kod_stav_registrace" && Object.keys(req.query).length === 1) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getStavyRegistraceKody);
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


ciselniky_router.get('/stavyregistrace/:kodStavRegistrace', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcs.getStavyRegistraceKodStavRegistrace.procParams.kod_stav_registrace.val = req.params.kodStavRegistrace;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getStavyRegistraceKodStavRegistrace);
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


export { ciselniky_router};

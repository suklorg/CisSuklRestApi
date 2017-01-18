"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const common_1 = require("../common");
let lp_router = express.Router();
exports.lp_router = lp_router;
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
lp_router.get('/lecivepripravky', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        res.type('application/json');
        //
        // /lecivepripravky
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getLecivePripravky.procParams.offset.val = 0;
            common_1.oraProcs.getLecivePripravky.procParams.limit.val = 20;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravky);
        }
        else if (typeof req.query.fields !== "undefined") {
            //
            //// ?fields=kod_sukl
            //
            if (req.query.fields === "kod_sukl") {
                //
                // /lecivepripravky?fields=kod_sukl
                //
                if (Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getLecivePripravkyKody.procParams.offset.val = 0;
                    common_1.oraProcs.getLecivePripravkyKody.procParams.limit.val = 20;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKody);
                }
                else if (typeof req.query.je_regulovany !== "undefined") {
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}
                    //
                    if (Object.keys(req.query).length === 2) {
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = 0;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = 20;
                        oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = 0;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = Number(req.query.offset);
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = 20;
                        oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = Number(req.query.offset);
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                }
                else if (typeof req.query.platnost_od !== "undefined") {
                    //
                    //// ?fields=kod_sukl&platnost_od={platnost_od}
                    //
                    if (Object.keys(req.query).length === 2) {
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = 0;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = 20;
                        oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = 0;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = 20;
                        oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                }
            }
            else if (req.query.fields === "kod_drzitele") {
            }
        }
        else {
            if (typeof req.query.platnost_od !== "undefined") {
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}
                //
                if (Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = 0;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = 20;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyPlatnostOd);
                }
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = 0;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyPlatnostOd);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = 20;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyPlatnostOd);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyPlatnostOd);
                }
            } ///////
            else {
                //
                // /lecivepripravky?limit={limit}
                //
                if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getLecivePripravky.procParams.offset.val = 0;
                    common_1.oraProcs.getLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravky);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravky.procParams.limit.val = 20;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravky);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravky);
                }
            }
        }
        //*/
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.totalCount.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage("Pro dané URL není služba implementována."));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send(common_1.FormatExceptionMessage(e.message));
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(e.message));
        }
        ;
        console.log(e.message);
    }
}));
lp_router.get('/lecivepripravky/:kodSukl', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getLecivePripravkyKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getLecivePripravkyKodSukl);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage("Pro dané URL není služba implementována."));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send(common_1.FormatExceptionMessage(e.message));
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(e.message));
        }
        ;
        console.log(e.message);
    }
}));
lp_router.get('/neregistrovanelecivepripravky', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getNeregistrovaneLecivePripravky);
        }
        else if (typeof req.query.obdobi_od !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getNeregistrovaneLecivePripravkyObdobiOd.procParams.obdobi_od.val = req.query.obdobi_od;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getNeregistrovaneLecivePripravkyObdobiOd);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage("Pro dané URL není služba implementována."));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send(common_1.FormatExceptionMessage(e.message));
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(e.message));
        }
        ;
        console.log(e.message);
    }
}));
//# sourceMappingURL=cissukl_lp_router.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lp_router = void 0;
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
            res.status(404).send(FormatExceptionMessage(errMessage400));
        }

    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
    }

});
*/
lp_router.get('/lecivepripravky/:kodSukl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    let oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getLecivePripravkyKodSukl);
    try {
        (0, common_1.SetHeader)(res);
        //res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            /*
            oraProcs.getLecivePripravkyKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodSukl);
            */
            //*
            oraProcedure.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
            //*/
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(common_1.errMessage400));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
lp_router.get('/lecivepripravky', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    let oraProcedure; // = new OraProcedure(oraProcs.getLecivePripravkyKodSukl);
    try {
        (0, common_1.SetHeader)(res);
        //res.type('application/json');
        //
        // /lecivepripravky
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getLecivePripravky.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky);
        }
        //
        //// lecivepripravky?kod_sukl={kod_sukl}&stavy_registrace=stavy_registrace_scau
        //
        else if ((typeof req.query.kod_sukl !== "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (Object.keys(req.query).length === 2)) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getLecivePripravkyKodSuklSRegScau);
            oraProcedure.procParams.kod_sukl.val = req.query.kod_sukl;
            //oraProcedure.procParams.stavy_registrace.val = req.query.stavy_registrace;
            //oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodSuklSRegScau);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
        }
        //
        //// lecivepripravky?stavy_registrace=stavy_registrace_scau
        //
        else if ((typeof req.query.fields === "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravkySRegScau.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravkySRegScau.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkySRegScau);
        }
        //
        //// lecivepripravky?stavy_registrace=stavy_registrace_scau&limit={limit}
        //
        else if ((typeof req.query.fields === "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravkySRegScau.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravkySRegScau.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkySRegScau);
        }
        //
        //// lecivepripravky?stavy_registrace=stavy_registrace_scau&offset={offset}
        //
        else if ((typeof req.query.fields === "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravkySRegScau.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravkySRegScau.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkySRegScau);
        }
        //
        //// lecivepripravky?stavy_registrace=stavy_registrace_scau&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields === "undefined") && (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            common_1.oraProcs.getLecivePripravkySRegScau.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravkySRegScau.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkySRegScau);
        }
        ///
        //
        //// lecivepripravky?fields=kod_sukl&stavy_registrace=stavy_registrace_scau
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravkyKodySRegScau.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravkyKodySRegScau.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodySRegScau);
        }
        //
        //// lecivepripravky?fields=kod_sukl&stavy_registrace=stavy_registrace_scau&limit={limit}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 3)) {
            common_1.oraProcs.getLecivePripravkyKodySRegScau.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravkyKodySRegScau.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodySRegScau);
        }
        //
        //// lecivepripravky?fields=kod_sukl&stavy_registrace=stavy_registrace_scau&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            common_1.oraProcs.getLecivePripravkyKodySRegScau.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravkyKodySRegScau.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodySRegScau);
        }
        //
        //// lecivepripravky?fields=kod_sukl&stavy_registrace=stavy_registrace_scau&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.stavy_registrace !== "undefined") && (req.query.stavy_registrace === "stavy_registrace_scau") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 4)) {
            common_1.oraProcs.getLecivePripravkyKodySRegScau.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravkyKodySRegScau.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodySRegScau);
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
                    common_1.oraProcs.getLecivePripravkyKody.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getLecivePripravkyKody.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKody);
                }
                //
                //// ?fields=kod_sukl&je_regulovany={je_regulovany}
                //
                else if (typeof req.query.je_regulovany !== "undefined") {
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}
                    //
                    if (Object.keys(req.query).length === 2) {
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = common_1.defOffset;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = common_1.defLimit;
                        oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}&limit={limit}
                    //
                    else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = common_1.defOffset;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}&offset={offset}
                    //
                    else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = Number(req.query.offset);
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = common_1.defLimit;
                        oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodyJeRegulovany);
                    }
                    //
                    //// /lecivepripravky?fields=kod_sukl&je_regulovany={je_regulovany}&limit={limit}&offset={offset}
                    //
                    else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.je_regulovany.val = req.query.je_regulovany;
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.offset.val = Number(req.query.offset);
                        common_1.oraProcs.getLecivePripravkyKodyJeRegulovany.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodyJeRegulovany);
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
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = common_1.defOffset;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = common_1.defLimit;
                        oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    //
                    //// ?fields=kod_sukl&platnost_od={platnost_od}&limit={limit}
                    //
                    else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = common_1.defOffset;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    //
                    //// ?fields=kod_sukl&platnost_od={platnost_od}&offset={offset}
                    //
                    else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = common_1.defLimit;
                        oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                    //
                    //// ?fields=kod_sukl&platnost_od={platnost_od}&limit={limit}&offset={offset}
                    //
                    else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                        common_1.oraProcs.getLecivePripravkyKodyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                        oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKodyPlatnostOd);
                    }
                }
                //
                // /lecivepripravky?fields=kod_sukl&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getLecivePripravkyKody.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getLecivePripravkyKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKody);
                }
                //
                // /lecivepripravky?fields=kod_sukl&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getLecivePripravkyKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravkyKody.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKody);
                }
                //
                // /lecivepripravky?fields=kod_sukl&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getLecivePripravkyKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravkyKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyKody);
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
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyPlatnostOd);
                }
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyPlatnostOd);
                }
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyPlatnostOd);
                }
                //
                //// ?fields=kod_sukl&platnost_od={platnost_od}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravkyPlatnostOd.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravkyPlatnostOd);
                }
            } ///////
            //
            // /lecivepripravky?
            //
            else {
                //
                // /lecivepripravky?limit={limit}
                //
                if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getLecivePripravky.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky);
                }
                //
                // /lecivepripravky?offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravky.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky);
                }
                //
                // /lecivepripravky?limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky);
                }
            }
        }
        //*/
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.totalCount.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(common_1.errMessage400));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
lp_router.get('/lecivepripravky/:kodSukl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    let oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getLecivePripravkyKodSukl);
    try {
        (0, common_1.SetHeader)(res);
        //res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            /*
            oraProcs.getLecivePripravkyKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getLecivePripravkyKodSukl);
            */
            //*
            oraProcedure.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
            //*/
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(common_1.errMessage400));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
lp_router.get('/neregistrovanelecivepripravky', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        //res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getNeregistrovaneLecivePripravky);
        }
        else if (typeof req.query.obdobi_od !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getNeregistrovaneLecivePripravkyObdobiOd.procParams.obdobi_od.val = req.query.obdobi_od;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getNeregistrovaneLecivePripravkyObdobiOd);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(common_1.errMessage400));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
lp_router.get('/ukoncenaregistracelecivepripravky', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        //res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getNeregistrovaneLecivePripravky);
        }
        else if (typeof req.query.obdobi_od !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getNeregistrovaneLecivePripravkyObdobiOd.procParams.obdobi_od.val = req.query.obdobi_od;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getNeregistrovaneLecivePripravkyObdobiOd);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(common_1.errMessage400));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
lp_router.get('/slozenilecivepripravky', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getSlozeniLecivePripravkyKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getSlozeniLecivePripravkyKodSukl);
        }
        else {
            //
            // /slozenilecivepripravky
            //
            if (Object.keys(req.query).length === 0) {
                common_1.oraProcs.getSlozeniLecivePripravky.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getSlozeniLecivePripravky.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getSlozeniLecivePripravky);
            }
            else {
                //
                // /slozenilecivepripravky?limit={limit}
                //
                if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getSlozeniLecivePripravky.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getSlozeniLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getSlozeniLecivePripravky);
                }
                //
                // /slozenilecivepripravky?offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getSlozeniLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getSlozeniLecivePripravky.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getSlozeniLecivePripravky);
                }
                //
                // /slozenilecivepripravky?limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getSlozeniLecivePripravky.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getSlozeniLecivePripravky.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getSlozeniLecivePripravky);
                }
            }
        }
        /////
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.totalCount.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(common_1.errMessage400));
        }
    }
    catch (e) {
        if (e instanceof common_1.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
//# sourceMappingURL=cissukl_lp_router.js.map
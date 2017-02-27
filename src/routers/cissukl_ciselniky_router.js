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
let ciselniky_router = express.Router();
exports.ciselniky_router = ciselniky_router;
/*
ciselniky_router.get('/docs', async (req: express.Request, res: express.Response): Promise<void> => {
    res.sendFile(__dirname + '\\public\\docs\\index.html');
});
*/
ciselniky_router.get('/ucinnelatky', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getUcinneLatky);
        }
        else if (req.query.fields === "kod_ucinna_latka" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getUcinneLatkyKody);
        }
        else if (req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getUcinneLatkyKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getUcinneLatkyKodSukl);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(common_1.errMessage400));
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
ciselniky_router.get('/ucinnelatky/:kodUcinnaLatka', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getUcinneLatkyKodUcinnaLatka.procParams.kod_ucinna_latka.val = req.params.kodUcinnaLatka;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getUcinneLatkyKodUcinnaLatka);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(common_1.errMessage400));
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
///
ciselniky_router.get('/atcskupiny', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getAtcSkupiny);
        }
        else if (req.query.fields === "kod_atc_skupina" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getAtcSkupinyKody);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(common_1.errMessage400));
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
ciselniky_router.get('/atcskupiny/:kodAtcSkupina', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getAtcSkupinyKodAtcSkupina.procParams.kod_atc_skupina.val = req.params.kodAtcSkupina;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getAtcSkupinyKodAtcSkupina);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(common_1.errMessage400));
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
ciselniky_router.get('/indikacniskupiny', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getIndikacniSkupiny);
        }
        else if (req.query.fields === "kod_indikacni_skupina" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getIndikacniSkupinyKody);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(common_1.errMessage400));
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
ciselniky_router.get('/indikacniskupiny/:kodIndikacniSkupina', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getIndikacniSkupinyKodIndikacniSkupina.procParams.kod_indikacni_skupina.val = req.params.kodIndikacniSkupina;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getIndikacniSkupinyKodIndikacniSkupina);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(common_1.errMessage400));
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
ciselniky_router.get('/stavyregistrace', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getStavyRegistrace);
        }
        else if (req.query.fields === "kod_stav_registrace" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getStavyRegistraceKody);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(common_1.errMessage400));
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
ciselniky_router.get('/stavyregistrace/:kodStavRegistrace', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getStavyRegistraceKodStavRegistrace.procParams.kod_stav_registrace.val = req.params.kodStavRegistrace;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getStavyRegistraceKodStavRegistrace);
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(common_1.FormatExceptionMessage(common_1.errMessage400));
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
//# sourceMappingURL=cissukl_ciselniky_router.js.map
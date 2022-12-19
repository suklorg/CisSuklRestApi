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
exports.ciselniky_router = void 0;
const express = require("express");
const common_1 = require("../common");
let ciselniky_router = express.Router();
exports.ciselniky_router = ciselniky_router;
/*
ciselniky_router.get('/docs', async (req: express.Request, res: express.Response): Promise<void> => {
    res.sendFile(__dirname + '\\public\\docs\\index.html');
});
*/
ciselniky_router.get('/obaly', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    let oraProcedure;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getObaly);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
        }
        else if (req.query.fields === "kod_obal" && Object.keys(req.query).length === 1) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getObalyKody);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
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
ciselniky_router.get('/obaly/:kodObal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    let oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getObalyKodObal);
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraProcedure.procParams.kod_obal.val = req.params.kodObal;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
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
ciselniky_router.get('/cestypodani', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCestyPodani);
        }
        else if (req.query.fields === "kod_cesta_podani" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCestyPodaniKody);
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
ciselniky_router.get('/cestypodani/:kodCestaPodani', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getCestyPodaniKodCestaPodani.procParams.kod_cesta_podani.val = req.params.kodCestaPodani;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCestyPodaniKodCestaPodani);
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
ciselniky_router.get('/lekoveformy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLekoveFormy);
        }
        else if (req.query.fields === "kod_lekova_forma" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLekoveFormyKody);
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
ciselniky_router.get('/lekoveformy/:kodLekovaForma', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getLekoveFormyKodLekovaForma.procParams.kod_lekova_forma.val = req.params.kodLekovaForma;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLekoveFormyKodLekovaForma);
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
ciselniky_router.get('/registracniprocedury', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getRegistracniProcedury);
        }
        else if (req.query.fields === "kod_registracni_procedura" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getRegistracniProceduryKody);
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
ciselniky_router.get('/registracniprocedury/:kodRegistracniProcedura', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getRegistracniProceduryKodRegistracniProcedura.procParams.kod_registracni_procedura.val = req.params.kodRegistracniProcedura;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getRegistracniProceduryKodRegistracniProcedura);
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
ciselniky_router.get('/indikacniskupiny', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getIndikacniSkupiny);
        }
        else if (req.query.fields === "kod_indikacni_skupina" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getIndikacniSkupinyKody);
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
ciselniky_router.get('/ucinnelatky', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getUcinneLatky);
        }
        else if (req.query.fields === "kod_ucinna_latka" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getUcinneLatkyKody);
        }
        //        else if (typeof req.query.obdobi_od !== "undefined" && Object.keys(req.query).length === 1) {
        else if (req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getUcinneLatkyKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getUcinneLatkyKodSukl);
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
ciselniky_router.get('/ucinnelatky/:kodUcinnaLatka', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getUcinneLatkyKodUcinnaLatka.procParams.kod_ucinna_latka.val = req.params.kodUcinnaLatka;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getUcinneLatkyKodUcinnaLatka);
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
///
ciselniky_router.get('/atcskupiny', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getAtcSkupiny);
        }
        else if (req.query.fields === "kod_atc_skupina" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getAtcSkupinyKody);
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
ciselniky_router.get('/atcskupiny/:kodAtcSkupina', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getAtcSkupinyKodAtcSkupina.procParams.kod_atc_skupina.val = req.params.kodAtcSkupina;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getAtcSkupinyKodAtcSkupina);
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
ciselniky_router.get('/indikacniskupiny', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getIndikacniSkupiny);
        }
        else if (req.query.fields === "kod_indikacni_skupina" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getIndikacniSkupinyKody);
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
ciselniky_router.get('/indikacniskupiny/:kodIndikacniSkupina', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getIndikacniSkupinyKodIndikacniSkupina.procParams.kod_indikacni_skupina.val = req.params.kodIndikacniSkupina;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getIndikacniSkupinyKodIndikacniSkupina);
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
ciselniky_router.get('/stavyregistrace', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getStavyRegistrace);
        }
        else if (req.query.fields === "kod_stav_registrace" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getStavyRegistraceKody);
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
ciselniky_router.get('/stavyregistrace/:kodStavRegistrace', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getStavyRegistraceKodStavRegistrace.procParams.kod_stav_registrace.val = req.params.kodStavRegistrace;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getStavyRegistraceKodStavRegistrace);
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
//# sourceMappingURL=cissukl_ciselniky_router.js.map
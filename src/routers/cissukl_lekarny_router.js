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
exports.lekarny_router = void 0;
const express = require("express");
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
const common_1 = require("../common");
const cis = require("../common");
let lekarny_router = express.Router();
exports.lekarny_router = lekarny_router;
lekarny_router.get('/lekarny', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        /*
        res.type('application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        */
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLekarny);
        }
        else if (typeof req.query.status !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getLekarnyStatus.procParams.status.val = req.query.status;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLekarnyStatus);
        }
        else if (req.query.fields === "kod_pracoviste" && Object.keys(req.query).length === 1) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLekarnyKody);
        }
        else if (req.query.fields === "kod_pracoviste" && Object.keys(req.query).length === 2 && typeof req.query.status !== "undefined") {
            common_1.oraProcs.getLekarnyKodyStatus.procParams.status.val = req.query.status;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLekarnyKodyStatus);
        }
        /*
                else if (typeof req.query.kod_pracoviste !== "undefined" && Object.keys(req.query).length === 1) {
                    oraProcs.getLekarnyKodPracoviste.procParams.kod_pracoviste.val = req.query.kod_pracoviste;
                    oraExecuteResult = await ExecuteProcedure(oraProcs.getLekarnyKodPracoviste);
                }
        */
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(common_1.errMessage400));
        }
    }
    catch (e) {
        if (e instanceof cis.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
lekarny_router.get('/lekarny/:kod_pracoviste', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getLekarnyKodPracoviste.procParams.kod_pracoviste.val = req.params.kod_pracoviste;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLekarnyKodPracoviste);
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
        if (e instanceof cis.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
//# sourceMappingURL=cissukl_lekarny_router.js.map
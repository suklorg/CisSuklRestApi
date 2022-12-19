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
exports.pk_router = void 0;
const express = require("express");
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
const common_1 = require("../common");
//let oracledb = require('oracledb');
let pk_router = express.Router();
exports.pk_router = pk_router;
pk_router.get('/paralelnikody', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    //oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];
    try {
        (0, common_1.SetHeader)(res);
        if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getParalelniKodyKodSuklScau.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getParalelniKodyKodSuklScau);
        }
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
pk_router.get('/paralelnikody/:kodSukl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getParalelniKodyKodSuklScau.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getParalelniKodyKodSuklScau);
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
//# sourceMappingURL=cissukl_pk_router.js.map
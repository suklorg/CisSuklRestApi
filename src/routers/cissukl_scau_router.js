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
exports.scau_router = void 0;
const express = require("express");
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
const common_1 = require("../common");
//let oracledb = require('oracledb');
let scau_router = express.Router();
exports.scau_router = scau_router;
scau_router.get('/scau', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    //oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];
    try {
        (0, common_1.SetHeader)(res);
        //
        // /scau
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getScau.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getScau.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScau);
        }
        //
        //// /scau?kod_sukl={kod_sukl}
        //
        else if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getScauKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScauKodSukl);
        }
        //
        //// /scau?kod_sukl={kod_sukl}&obdobi={obdobi}
        //
        else if (typeof req.query.kod_sukl !== "undefined" && typeof req.query.obdobi !== "undefined" && Object.keys(req.query).length === 2) {
            common_1.oraProcs.getScauKodSuklObdobi.procParams.kod_sukl.val = req.query.kod_sukl;
            common_1.oraProcs.getScauKodSuklObdobi.procParams.obdobi.val = req.query.obdobi;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScauKodSuklObdobi);
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
                // /scau?fields=kod_sukl
                //
                if (Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getScauKody.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getScauKody.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScauKody);
                }
                //
                // /scau?fields=kod_sukl&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getScauKody.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getScauKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScauKody);
                }
                //
                // /scau?fields=kod_sukl&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getScauKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getScauKody.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScauKody);
                }
                //
                // /scau?fields=kod_sukl&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getScauKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getScauKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScauKody);
                }
            }
        }
        //
        //// NENI ?fields=kod_sukl
        //-----------------------------------------------------------------
        else {
            //
            // /scau?limit={limit}
            //
            if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                common_1.oraProcs.getScau.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getScau.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScau);
            }
            //
            // /scau?offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                common_1.oraProcs.getScau.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getScau.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScau);
            }
            //
            // /scau?limit={limit}&offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                common_1.oraProcs.getScau.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getScau.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScau);
            }
            //*/
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
scau_router.get('/scau/:kodSukl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getScauKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getScauKodSukl);
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
//# sourceMappingURL=cissukl_scau_router.js.map
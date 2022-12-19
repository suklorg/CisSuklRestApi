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
exports.cp_router = void 0;
const express = require("express");
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
const common_1 = require("../common");
//let oracledb = require('oracledb');
let cp_router = express.Router();
exports.cp_router = cp_router;
cp_router.get('/cenypuvodce', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    //oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];
    try {
        (0, common_1.SetHeader)(res);
        //
        // /cenypuvodce
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getCenyPuvodce.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getCenyPuvodce.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodce);
        }
        //
        //// /cenypuvodce?kod_sukl={kod_sukl}
        //
        else if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getCenyPuvodceKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodceKodSukl);
        }
        //
        //// /cenypuvodce?kod_sukl={kod_sukl}&obdobi={obdobi}
        //
        /*
        else if (typeof req.query.kod_sukl !== "undefined" && typeof req.query.obdobi !== "undefined" && Object.keys(req.query).length === 2) {
            oraProcs.getCenyPuvodceKodSuklObdobi.procParams.kod_sukl.val = req.query.kod_sukl;
            oraProcs.getCenyPuvodceKodSuklObdobi.procParams.obdobi.val = req.query.obdobi;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCenyPuvodceKodSuklObdobi);
        }
        */
        //
        //// ?fields=...
        //
        else if (typeof req.query.fields !== "undefined") {
            //
            //// ?fields=kod_sukl
            //
            if (req.query.fields === "kod_sukl") {
                //
                // /cenypuvodce?fields=kod_sukl
                //
                if (Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getCenyPuvodceKody.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getCenyPuvodceKody.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodceKody);
                }
                //
                // /cenypuvodce?fields=kod_sukl&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getCenyPuvodceKody.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getCenyPuvodceKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodceKody);
                }
                //
                // /cenypuvodce?fields=kod_sukl&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getCenyPuvodceKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getCenyPuvodceKody.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodceKody);
                }
                //
                // /cenypuvodce?fields=kod_sukl&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getCenyPuvodceKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getCenyPuvodceKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodceKody);
                }
            }
        }
        //
        //// NENI ?fields=kod_sukl
        //-----------------------------------------------------------------
        else {
            //
            // /cenypuvodce?limit={limit}
            //
            if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                common_1.oraProcs.getCenyPuvodce.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getCenyPuvodce.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodce);
            }
            //
            // /cenypuvodce?offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                common_1.oraProcs.getCenyPuvodce.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getCenyPuvodce.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodce);
            }
            //
            // /cenypuvodce?limit={limit}&offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                common_1.oraProcs.getCenyPuvodce.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getCenyPuvodce.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodce);
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
cp_router.get('/cenypuvodce/:kodSukl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getCenyPuvodceKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCenyPuvodceKodSukl);
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
//# sourceMappingURL=cissukl_cp_router.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
const common_1 = require("../common");
//let oracledb = require('oracledb');
let cp_router = express.Router();
exports.cp_router = cp_router;
cp_router.get('/cenypuvodce', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    //oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];
    try {
        common_1.SetHeader(res);
        //
        // /cenypuvodce
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getCenyPuvodce.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getCenyPuvodce.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodce);
        }
        else if (typeof req.query.kod_sukl !== "undefined" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getCenyPuvodceKodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodceKodSukl);
        }
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
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodceKody);
                }
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getCenyPuvodceKody.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getCenyPuvodceKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodceKody);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getCenyPuvodceKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getCenyPuvodceKody.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodceKody);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getCenyPuvodceKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getCenyPuvodceKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodceKody);
                }
            }
        }
        else {
            //
            // /cenypuvodce?limit={limit}
            //
            if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                common_1.oraProcs.getCenyPuvodce.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getCenyPuvodce.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodce);
            }
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                common_1.oraProcs.getCenyPuvodce.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getCenyPuvodce.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodce);
            }
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                common_1.oraProcs.getCenyPuvodce.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getCenyPuvodce.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodce);
            }
            //*/
        }
        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.totalCount.toString());
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
cp_router.get('/cenypuvodce/:kodSukl', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getCenyPuvodceKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getCenyPuvodceKodSukl);
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
//# sourceMappingURL=cissukl_cp_router.js.map
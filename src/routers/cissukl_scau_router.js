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
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
const common_1 = require("../common");
//let oracledb = require('oracledb');
let scau_router = express.Router();
exports.scau_router = scau_router;
scau_router.get('/scau', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    //oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];
    try {
        res.type('application/json');
        //
        // /scau
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getScau.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getScau.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScau);
        }
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
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScauKody);
                }
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getScauKody.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getScauKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScauKody);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getScauKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getScauKody.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScauKody);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getScauKody.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getScauKody.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScauKody);
                }
            }
        }
        else {
            //
            // /scau?limit={limit}
            //
            if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                common_1.oraProcs.getScau.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getScau.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScau);
            }
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                common_1.oraProcs.getScau.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getScau.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScau);
            }
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                common_1.oraProcs.getScau.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getScau.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScau);
            }
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
scau_router.get('/scau/:kodSukl', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getScauKodSukl.procParams.kod_sukl.val = req.params.kodSukl;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getScauKodSukl);
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
//# sourceMappingURL=cissukl_scau_router.js.map
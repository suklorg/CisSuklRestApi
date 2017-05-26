"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const common_1 = require("../common");
let organizace_router = express.Router();
exports.organizace_router = organizace_router;
organizace_router.get('/organizace', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        //
        // /organizace
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getOrganizace.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getOrganizace.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizace);
        }
        else if (typeof req.query.fields !== "undefined") {
            //
            // /organizace?fields=kod_organizace
            //
            if (Object.keys(req.query).length === 1) {
                common_1.oraProcs.getOrganizaceKody.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getOrganizaceKody.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKody);
            }
            else if (typeof req.query.je_drzitel !== "undefined") {
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}
                //
                if (Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodyJeDrzitel);
                }
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodyJeDrzitel);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodyJeDrzitel);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodyJeDrzitel);
                }
            }
            else if (typeof req.query.je_vyrobce !== "undefined") {
                //
                // /organizace?fields=kod_organizace&je_vyrobce={je_vyrobce}
                //
                if (Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodyJeVyrobce);
                }
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodyJeVyrobce);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodyJeVyrobce);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodyJeVyrobce);
                }
            }
            else if ((typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2)) {
                common_1.oraProcs.getOrganizaceKody.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getOrganizaceKody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKody);
            }
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                common_1.oraProcs.getOrganizaceKody.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getOrganizaceKody.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKody);
            }
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                common_1.oraProcs.getOrganizaceKody.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getOrganizaceKody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKody);
            }
        }
        else {
            //
            //// &je_drzitel={je_drzitel}
            //
            if (typeof req.query.je_drzitel !== "undefined") {
                //
                // /organizace?je_drzitel={je_drzitel}
                //
                if (Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceJeDrzitel);
                }
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceJeDrzitel);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceJeDrzitel);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceJeDrzitel);
                }
            }
            else if (typeof req.query.je_vyrobce !== "undefined") {
                //
                // /organizace?je_vyrobce={je_vyrobce}
                //
                if (Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceJeVyrobce);
                }
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceJeVyrobce);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceJeVyrobce);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceJeVyrobce);
                }
            }
            else {
                //
                // /organizace?limit={limit}
                //
                if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getOrganizace.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizace.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizace);
                }
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getOrganizace.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizace.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizace);
                }
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizace.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizace.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizace);
                }
            }
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
organizace_router.get('/organizace/:kodOrganizace', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        common_1.SetHeader(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getOrganizaceKodOrganizace.procParams.kod_organizace.val = req.params.kodOrganizace;
            oraExecuteResult = yield common_1.ExecuteProcedure(common_1.oraProcs.getOrganizaceKodOrganizace);
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
//# sourceMappingURL=cissukl_organizace_router.js.map
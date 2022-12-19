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
exports.organizace_router = void 0;
const express = require("express");
const common_1 = require("../common");
let organizace_router = express.Router();
exports.organizace_router = organizace_router;
organizace_router.get('/organizace', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        //
        // /organizace
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getOrganizace.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getOrganizace.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizace);
        }
        //
        //// ?fields=kod_organizace
        //
        else if (typeof req.query.fields !== "undefined") {
            //
            // /organizace?fields=kod_organizace
            //
            if (Object.keys(req.query).length === 1) {
                common_1.oraProcs.getOrganizaceKody.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getOrganizaceKody.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKody);
            }
            //
            //// ?fields=kod_organizace&je_drzitel={je_drzitel}
            //
            else if (typeof req.query.je_drzitel !== "undefined") {
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}
                //
                if (Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodyJeDrzitel);
                }
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodyJeDrzitel);
                }
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodyJeDrzitel);
                }
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_drzitel}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceKodyJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodyJeDrzitel);
                }
            }
            //
            //// ?fields=kod_organizace&je_vyrobce={je_vyrobce}
            //
            else if (typeof req.query.je_vyrobce !== "undefined") {
                //
                // /organizace?fields=kod_organizace&je_vyrobce={je_vyrobce}
                //
                if (Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodyJeVyrobce);
                }
                //
                // /organizace?fields=kod_organizace&je_drzitel={je_vyrobce}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodyJeVyrobce);
                }
                //
                // /organizace?fields=kod_organizace&je_vyrobce={je_vyrobce}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodyJeVyrobce);
                }
                //
                // /organizace?fields=kod_organizace&je_vyrobce={je_vyrobce}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 4) {
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceKodyJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodyJeVyrobce);
                }
            }
            //
            // /organizace?fields=kod_organizace&limit={limit}
            //
            else if ((typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2)) {
                common_1.oraProcs.getOrganizaceKody.procParams.offset.val = common_1.defOffset;
                common_1.oraProcs.getOrganizaceKody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKody);
            }
            //
            // /organizace?fields=kod_organizace&offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                common_1.oraProcs.getOrganizaceKody.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getOrganizaceKody.procParams.limit.val = common_1.defLimit;
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKody);
            }
            //
            // /organizace?fields=kod_organizace&limit={limit}&offset={offset}
            //
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                common_1.oraProcs.getOrganizaceKody.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getOrganizaceKody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKody);
            }
        }
        //
        //// NENI ?fields=kod_organizace
        //-----------------------------------------------------------------
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
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceJeDrzitel);
                }
                //
                // /organizace?je_drzitel={je_drzitel}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceJeDrzitel);
                }
                //
                // /organizace?je_drzitel={je_drzitel}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceJeDrzitel);
                }
                //
                // /organizace?je_drzitel={je_drzitel}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.je_drzitel.val = req.query.je_drzitel;
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceJeDrzitel.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceJeDrzitel);
                }
            }
            //
            //// &je_vyrobce={je_vyrobce}
            //
            else if (typeof req.query.je_vyrobce !== "undefined") {
                //
                // /organizace?je_vyrobce={je_vyrobce}
                //
                if (Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceJeVyrobce);
                }
                //
                // /organizace?je_drzitel={je_vyrobce}&limit={limit}
                //
                else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceJeVyrobce);
                }
                //
                // /organizace?je_vyrobce={je_vyrobce}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceJeVyrobce);
                }
                //
                // /organizace?je_vyrobce={je_vyrobce}&limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.je_vyrobce.val = req.query.je_vyrobce;
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizaceJeVyrobce.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceJeVyrobce);
                }
            }
            else {
                //
                // /organizace?limit={limit}
                //
                if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getOrganizace.procParams.offset.val = common_1.defOffset;
                    common_1.oraProcs.getOrganizace.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizace);
                }
                //
                // /organizace?offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 1) {
                    common_1.oraProcs.getOrganizace.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizace.procParams.limit.val = common_1.defLimit;
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizace);
                }
                //
                // /organizace?limit={limit}&offset={offset}
                //
                else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                    common_1.oraProcs.getOrganizace.procParams.offset.val = Number(req.query.offset);
                    common_1.oraProcs.getOrganizace.procParams.limit.val = Number(req.query.limit);
                    oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizace);
                }
            }
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
organizace_router.get('/organizace/:kodOrganizace', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getOrganizaceKodOrganizace.procParams.kod_organizace.val = req.params.kodOrganizace;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getOrganizaceKodOrganizace);
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
//# sourceMappingURL=cissukl_organizace_router.js.map
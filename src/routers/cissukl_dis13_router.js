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
exports.dis13_router = void 0;
const express = require("express");
const common_1 = require("../common");
let dis13_router = express.Router();
exports.dis13_router = dis13_router;
dis13_router.get('/dodavky', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        res.type('application/json');
        if (req.query.fields === "kod_sukl") {
            if (Object.keys(req.query).length === 1) {
                common_1.oraProcs.getDis13Kody.procParams.offset.val = 0;
                common_1.oraProcs.getDis13Kody.procParams.limit.val = 20;
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getDis13Kody);
            }
            else if (typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 2) {
                common_1.oraProcs.getDis13Kody.procParams.offset.val = 0;
                common_1.oraProcs.getDis13Kody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getDis13Kody);
            }
            else if (typeof req.query.offset !== "undefined" && Object.keys(req.query).length === 2) {
                common_1.oraProcs.getDis13Kody.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getDis13Kody.procParams.limit.val = 20;
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getDis13Kody);
            }
            else if (typeof req.query.offset !== "undefined" && typeof req.query.limit !== "undefined" && Object.keys(req.query).length === 3) {
                common_1.oraProcs.getDis13Kody.procParams.offset.val = Number(req.query.offset);
                common_1.oraProcs.getDis13Kody.procParams.limit.val = Number(req.query.limit);
                oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getDis13Kody);
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
//# sourceMappingURL=cissukl_dis13_router.js.map
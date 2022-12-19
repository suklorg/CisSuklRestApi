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
exports.lp_naz2_router = void 0;
const express = require("express");
const common_1 = require("../common");
let lp_naz2_router = express.Router();
exports.lp_naz2_router = lp_naz2_router;
lp_naz2_router.get('/lecivepripravky2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        //res.type('application/json');
        //
        // /lecivepripravky2
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getLecivePripravky2.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky2.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2);
        }
        //
        //// lecivepripravky2?limit={limit}
        //
        else if ((typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravky2.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky2.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2);
        }
        //
        //// lecivepripravky2?offset={offset}
        //
        else if ((typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravky2.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravky2.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2);
        }
        //
        //// lecivepripravky2?limit={limit}&offset={offset}
        //
        else if ((typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravky2.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravky2.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2);
        }
        //
        //// lecivepripravky2?kod_sukl={kod_sukl}
        //
        else if ((typeof req.query.kod_sukl !== "undefined") && (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravky2KodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2KodSukl);
        }
        //
        //// lecivepripravky2?fields=kod_sukl
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") && (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravky2Kody.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky2Kody.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2Kody);
        }
        //
        //// lecivepripravky2?fields=kod_sukl&limit={limit}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravky2Kody.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky2Kody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2Kody);
        }
        //
        //// lecivepripravky2?fields=kod_sukl&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravky2Kody.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravky2Kody.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2Kody);
        }
        //
        //// lecivepripravky2?fields=kod_sukl&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            common_1.oraProcs.getLecivePripravky2Kody.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravky2Kody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky2Kody);
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
//# sourceMappingURL=cissukl_lp_naz2_router.js.map
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
exports.lp_bwl_router = void 0;
const express = require("express");
const common_1 = require("../common");
let lp_bwl_router = express.Router();
exports.lp_bwl_router = lp_bwl_router;
lp_bwl_router.get('/lecivepripravky3', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        (0, common_1.SetHeader)(res);
        //res.type('application/json');
        //
        // /lecivepripravky3
        //
        if (Object.keys(req.query).length === 0) {
            common_1.oraProcs.getLecivePripravky3.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky3.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3);
        }
        //
        //// lecivepripravky3?limit={limit}
        //
        else if ((typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravky3.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky3.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3);
        }
        //
        //// lecivepripravky3?offset={offset}
        //
        else if ((typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravky3.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravky3.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3);
        }
        //
        //// lecivepripravky3?limit={limit}&offset={offset}
        //
        else if ((typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravky3.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravky3.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3);
        }
        //
        //// lecivepripravky3?kod_sukl={kod_sukl}
        //
        else if ((typeof req.query.kod_sukl !== "undefined") && (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravky3KodSukl.procParams.kod_sukl.val = req.query.kod_sukl;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3KodSukl);
        }
        //
        //// lecivepripravky3?fields=kod_sukl
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") && (Object.keys(req.query).length === 1)) {
            common_1.oraProcs.getLecivePripravky3Kody.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky3Kody.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3Kody);
        }
        //
        //// lecivepripravky3?fields=kod_sukl&limit={limit}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravky3Kody.procParams.offset.val = common_1.defOffset;
            common_1.oraProcs.getLecivePripravky3Kody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3Kody);
        }
        //
        //// lecivepripravky3?fields=kod_sukl&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 2)) {
            common_1.oraProcs.getLecivePripravky3Kody.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravky3Kody.procParams.limit.val = common_1.defLimit;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3Kody);
        }
        //
        //// lecivepripravky3?fields=kod_sukl&limit={limit}&offset={offset}
        //
        else if ((typeof req.query.fields !== "undefined") && (req.query.fields === "kod_sukl") &&
            (typeof req.query.limit !== "undefined") && (typeof req.query.offset !== "undefined") && (Object.keys(req.query).length === 3)) {
            common_1.oraProcs.getLecivePripravky3Kody.procParams.offset.val = Number(req.query.offset);
            common_1.oraProcs.getLecivePripravky3Kody.procParams.limit.val = Number(req.query.limit);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getLecivePripravky3Kody);
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
//# sourceMappingURL=cissukl_lp_bwl_router.js.map
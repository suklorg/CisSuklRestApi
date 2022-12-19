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
exports.distributori_router = void 0;
const express = require("express");
const common_1 = require("../common");
let distributori_router = express.Router();
exports.distributori_router = distributori_router;
distributori_router.get('/distributori', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    let oraProcedure;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getDistributori);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
        }
        else if (typeof req.query.ico !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getDistributoriIco);
            oraProcedure.procParams.ico.val = req.query.ico;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
        }
        else if (typeof req.query.nazev != "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getDistributoriNazev);
            oraProcedure.procParams.nazev.val = req.query.nazev;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
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
//# sourceMappingURL=cissukl_distributori_router.js.map
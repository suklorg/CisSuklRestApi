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
const common_1 = require("../common");
let cp_router = express.Router();
exports.cp_router = cp_router;
cp_router.post('/cp', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        let body = JSON.stringify(req.body);
        let bodyObj = JSON.parse("{\"organizace\": \"SUKL test\",\"hlaseni\": [{\"kod_sukl\": \"0000100\",\"cena_puvodce\": \"100\"},{\"kod_sukl\": \"0000200\",\"cena_puvodce\":\"200\"}]}");
        res.sendStatus(200);
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
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const oracledb_1 = require('oracledb');
let ectd_router = express.Router();
exports.ectd_router = ectd_router;
let connectString = { user: "cis_dlp", password: "cis_dlp", connectString: "dlptest" };
const selRegistracniCislaCisloJednaci = "SELECT spisova_znacka as cislo_jednaci, registracni_cislo, asmf_cislo FROM sez_spis_znacky WHERE platnost_do IS NULL AND spisova_znacka = :cisloJednaci";
function GetSezRegistracniCislaCisloJednaci(cisloJednaci) {
    return __awaiter(this, void 0, Promise, function* () {
        let connection = yield oracledb_1.getConnection(connectString);
        let result = yield connection.execute(selRegistracniCislaCisloJednaci, [cisloJednaci], { outFormat: oracledb_1.OBJECT });
        return result.rows;
    });
}
ectd_router.get('/registracnicisla/cislojednaci/:cisloJednaci', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetSezRegistracniCislaCisloJednaci(req.params.cisloJednaci));
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        //let a: {} = JSON.parse('{ "error" : "' + s + '"}');
        res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
    }
}));
////
//*/
//# sourceMappingURL=cissukl_ectd_router.js.map
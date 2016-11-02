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
//import { getLogger } from 'log4js';
var log4js = require('log4js');
var logger = log4js.getLogger();
let oracledb = require('oracledb');
//import * as oracledb from "oracledb";
//import {getConnection, IConnection, IExecuteOptions, IExecuteReturn, OBJECT } from 'oracledb';
let connectString = { user: "cis_sukl", password: "cis_sukl", connectString: "dlptest" };
let cis_router = express.Router();
exports.cis_router = cis_router;
//const selLecivePripravky: string = "SELECT kod_sukl,nazev,sila,kod_lekova_forma,baleni,kod_cesta_podani,doplnek,kod_obal,registracni_cislo,kod_registracni_procedura,kod_stav_registrace,kod_druh_registrace,kod_organizace_drzitel,kod_zeme_drzitel,kod_organizace_drzitel_sreg_b,kod_zeme_drzitel_sreg_b,soubezny_dovoz,kod_organizace_dovozce,kod_zeme_dovozce,platnost_registrace_do,neomezena_platnost_registrace,uvadeni_do,kod_indikacni_skupina,kod_atc_skupina,ddd_mnozstvi,ddd_jednotka,ddd_baleni,ddd_zdroj,povinne_vzorky,kod_zpusob_vydeje,kod_zavislost,kod_doping,kod_narizeni_vlady,braillovo_pismo,expirace,expirace_jednotka FROM sez_dlp WHERE platnost_do IS NULL ORDER BY nazev,doplnek,kod_sukl";
function GetLecivePripravky() {
    return __awaiter(this, void 0, Promise, function* () {
        /*
        oracledb.maxRows = 100;
        let connection = await oracledb.getConnection(connectString);
        let result: any = await connection.execute(selLecivePripravky, [], { outFormat: oracledb.OBJECT });
        return result.rows;
        */
        let oraProcedure = "BEGIN cis_sukl_dlp.GetLecivePripravky(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/lecivepripravky', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetLecivePripravky());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
    }
}));
/////
//const selLecivePripravkyKody: string = "SELECT kod_sukl FROM sez_dlp WHERE platnost_do IS NULL ORDER BY kod_sukl";
function GetLecivePripravkyKody() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetLecivePripravkyKody(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/lecivepripravky/kody', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetLecivePripravkyKody());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
//const selLecivePripravkyKodSukl: string = "SELECT kod_sukl, nazev, sila, kod_lekova_forma, baleni, kod_cesta_podani, doplnek, kod_obal, registracni_cislo, kod_registracni_procedura, kod_stav_registrace, kod_druh_registrace, kod_organizace_drzitel, kod_zeme_drzitel, kod_organizace_drzitel_sreg_b, kod_zeme_drzitel_sreg_b, soubezny_dovoz, kod_organizace_dovozce, kod_zeme_dovozce, platnost_registrace_do, neomezena_platnost_registrace, uvadeni_do, kod_indikacni_skupina, kod_atc_skupina, ddd_mnozstvi, ddd_jednotka, ddd_baleni, ddd_zdroj, povinne_vzorky, kod_zpusob_vydeje, kod_zavislost, kod_doping, kod_narizeni_vlady, braillovo_pismo, expirace, expirace_jednotka FROM sez_dlp WHERE platnost_do IS NULL AND kod_sukl = :kodSukl";
function GetLecivePripravkyKodSukl(kodSukl) {
    return __awaiter(this, void 0, Promise, function* () {
        /*
        oracledb.maxRows = 100;
        let connection = await oracledb.getConnection(connectString);
        let result: any = await connection.execute(selLecivePripravkyKodSukl, [kodSukl], { outFormat: oracledb.OBJECT });
        return result.rows;
        */
        let oraProcedure = "BEGIN cis_sukl_dlp.GetLecivePripravkyKodSukl(:kodSukl, :cursor); END;";
        let oraParameters = {
            kodSukl: { val: kodSukl, type: oracledb.STRING, dir: oracledb.BIND_IN },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(1);
        return result.rows;
    });
}
cis_router.get('/lecivepripravky/:kodSukl', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetLecivePripravkyKodSukl(req.params.kodSukl));
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
// stavy registrace
////
function GetStavyRegistrace() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetStavyRegistrace(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/stavyregistrace', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetStavyRegistrace());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
function GetStavyRegistraceKody() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetStavyRegistraceKody(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/stavyregistrace/kody', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetStavyRegistraceKody());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
function GetStavyRegistraceKodStavRegistrace(kodStavRegistrace) {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetStavyRegistraceKodStavReg(:kodStavRegistrace, :cursor); END;";
        let oraParameters = {
            kodStavRegistrace: { val: kodStavRegistrace, type: oracledb.STRING, dir: oracledb.BIND_IN },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(1);
        return result.rows;
    });
}
cis_router.get('/stavyregistrace/:kodStavRegistrace', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetStavyRegistraceKodStavRegistrace(req.params.kodStavRegistrace));
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
// atc skupiny
////
function GetAtcSkupiny() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetAtcSkupiny(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/atcskupiny', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetAtcSkupiny());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
////
function GetAtcSkupinyKody() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetAtcSkupinyKody(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/atcskupiny/kody', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetAtcSkupinyKody());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
function GetAtcSkupinyKodAtcSkupina(kodAtcSkupina) {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetAtcSkupinyKodAtcSkupina(:kodAtcSkupina, :cursor); END;";
        let oraParameters = {
            kodAtcSkupina: { val: kodAtcSkupina, type: oracledb.STRING, dir: oracledb.BIND_IN },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(1);
        return result.rows;
    });
}
cis_router.get('/atcskupiny/:kodAtcSkupina', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetAtcSkupinyKodAtcSkupina(req.params.kodAtcSkupina));
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
// indikacni skupiny
////
function GetIndikacniSkupiny() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetIndikacniSkupiny(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/indikacniskupiny', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetIndikacniSkupiny());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
////
function GetIndikacniSkupinyKody() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetIndikacniSkupinyKody(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/indikacniskupiny/kody', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetIndikacniSkupinyKody());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
function GetIndikacniSkupinyKodIndikacniSkupina(kodIndikacniSkupina) {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetIndikacniSkupinyKodIndSkup(:kodIndikacniSkupina, :cursor); END;";
        let oraParameters = {
            kodIndikacniSkupina: { val: kodIndikacniSkupina, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        try {
            //connection = await oracledb.getConnection(connectString);
            let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
            result.rows = yield result.outBinds.cursor.getRows(1);
            return result.rows;
        }
        finally {
            connection.close();
        }
    });
}
cis_router.get('/indikacniskupiny/:kodIndikacniSkupina', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetIndikacniSkupinyKodIndikacniSkupina(Number(req.params.kodIndikacniSkupina)));
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
// ucinne latky
////
function GetUcinneLatky() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetUcinneLatky(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/ucinnelatky', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetUcinneLatky());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
function GetUcinneLatkyKody() {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetUcinneLatkyKody(:count, :cursor); END;";
        let oraParameters = {
            count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(Number(result.outBinds.count));
        return result.rows;
    });
}
cis_router.get('/ucinnelatky/kody', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetUcinneLatkyKody());
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
function GetUcinneLatkyKodUcinnaLatka(kodUcinnaLatka) {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetUcinneLatkyKodUcinnaLatka(:kodUcinnaLatka,  :cursor); END;";
        let oraParameters = {
            kodUcinnaLatka: { val: kodUcinnaLatka },
            //count: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(1);
        return result.rows;
    });
}
cis_router.get('/ucinnelatky/:kodUcinnaLatka', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetUcinneLatkyKodUcinnaLatka(req.params.kodUcinnaLatka));
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
/////
function GetUcinneLatkyKodSukl(kodSukl) {
    return __awaiter(this, void 0, Promise, function* () {
        //oracledb.maxRows = 1000;
        let oraProcedure = "BEGIN cis_sukl_dlp.GetUcinneLatkyKodSukl(:kodSukl, :count, :cursor); END;";
        let oraParameters = {
            kodSukl: { val: kodSukl },
            count: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        };
        let connection = yield oracledb.getConnection(connectString);
        let result = yield connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = yield result.outBinds.cursor.getRows(result.outBinds.count);
        return result.rows;
    });
}
cis_router.get('/ucinnelatky/kodsukl/:kodSukl', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetUcinneLatkyKodSukl(req.params.kodSukl));
    }
    catch (e) {
        let s = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
}));
//*/
//# sourceMappingURL=cissukl_router.js.map
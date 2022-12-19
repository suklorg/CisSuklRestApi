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
exports.cdnu_router = void 0;
const express = require("express");
const common_1 = require("../common");
const oracledb_1 = require("oracledb");
let cdnu_router = express.Router();
exports.cdnu_router = cdnu_router;
;
class RegCislo {
}
;
cdnu_router.post('/cdnu', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    null;
    let oraExecuteResult;
    //let connectionAttributes: IConnectionAttributes = { user: "aislp", password: "drdrug", connectString: "dlptest" };
    //let connectionAttributes: IConnectionAttributes = { user: "aislp", password: "drdrug", connectString: "dlp" };
    let connection = yield (0, oracledb_1.getConnection)(common_1.connectionAttributesDlp);
    try {
        res.type('application/json');
        let cisloJednaci = req.body.cislo_jednaci;
        let uuid = req.body.uuid;
        let registracniCislo = req.body.registracni_cislo;
        let regCislo = new RegCislo();
        if (registracniCislo != null) {
            regCislo = GetRegCislo(registracniCislo);
            if (regCislo == null) {
                res.status(415).send('Špatný formát vstupních dat.');
                return;
            }
        }
        /*
               else
               {
                   regCislo.rg = null;
                   regCislo.rsq = null;
                   regCislo.ry = null;
                   regCislo.rr = null;
               }
        */
        let result = yield connection.execute('insert into dl_bl_uuid (cislo_jednaci, uuid, rg, rsq, ry, rr, registracni_cislo) values (:cislo_jednaci, :uuid, :rg, :rsq, :ry, :rr, :registracni_cislo)', { cislo_jednaci: cisloJednaci, uuid: uuid, rg: regCislo.rg, rsq: regCislo.rsq, ry: regCislo.ry, rr: regCislo.rr, registracni_cislo: registracniCislo }, { autoCommit: true });
        res.sendStatus(201);
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
function GetRegCislo(registracniCislo) {
    let regCislo = new RegCislo();
    let i, j, k, l;
    if (registracniCislo.substr(0, 2) == "EU") {
        i = registracniCislo.indexOf("/");
        if (i == -1)
            return null;
        j = registracniCislo.indexOf("/", i + 1);
        if (j == -1)
            return null;
        regCislo.rr = "EU" + registracniCislo.substr(i + 1, j - i - 1);
        k = registracniCislo.indexOf("/", j + 1);
        if (k == -1)
            return null;
        regCislo.rg = registracniCislo.substr(j + 1, k - j - 1);
        l = registracniCislo.indexOf("/", k + 1);
        if (l == -1)
            return null;
        regCislo.rsq = registracniCislo.substr(k + 1, l - k - 1);
        regCislo.ry = registracniCislo.substr(l + 1, registracniCislo.length - l - 1);
    }
    else {
        i = registracniCislo.indexOf("/");
        if (i == -1)
            return null;
        regCislo.rg = registracniCislo.substr(0, i);
        j = registracniCislo.indexOf("/", i + 1);
        if (j == -1)
            return null;
        regCislo.rsq = registracniCislo.substr(i + 1, j - i - 1);
        k = registracniCislo.indexOf("-", j + 1);
        if (k == -1)
            return null;
        regCislo.ry = registracniCislo.substr(j + 1, k - j - 1);
        regCislo.rr = registracniCislo.substr(k + 1, registracniCislo.length - k - 1);
    }
    return regCislo;
}
//# sourceMappingURL=cissukl_cdnu_router.js.map
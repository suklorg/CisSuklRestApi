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
exports.archiv_router = void 0;
const express = require("express");
const common_1 = require("../common");
const oracledb_1 = require("oracledb");
let archiv_router = express.Router();
exports.archiv_router = archiv_router;
archiv_router.post('/archiv', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    null;
    let oraExecuteResult;
    //let connectionAttributes: IConnectionAttributes = { user: "aislp", password: "drdrug", connectString: "dlp" };
    let connection = yield (0, oracledb_1.getConnection)(common_1.connectionAttributesDlp);
    try {
        res.type('application/json');
        let cisloBedny = req.body.cislo_bedny;
        let cisloSsa = req.body.cislo_ssa;
        let result = yield connection.execute('update arch_bedny set ss_id = :cislo_ssa where cislo_bedny = :cislo_bedny', { cislo_ssa: cisloSsa, cislo_bedny: cisloBedny }, { autoCommit: true });
        /*
        let result: any = await connection.execute('insert into dl_bl_uuid (cislo_jednaci, uuid, rg, rsq, ry, rr, registracni_cislo) values (:cislo_jednaci, :uuid, :rg, :rsq, :ry, :rr, :registracni_cislo)',
            { cislo_jednaci: cisloJednaci, uuid: uuid, rg: regCislo.rg, rsq: regCislo.rsq, ry: regCislo.ry, rr: regCislo.rr, registracni_cislo: registracniCislo }, { autoCommit: true });
        */
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
archiv_router.get('/archiv', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    let oraProcedure;
    try {
        (0, common_1.SetHeader)(res);
        if (Object.keys(req.query).length === 0) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getArchiv);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
        }
        else if (typeof req.query.cislo_bedny !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getArchivBedna);
            oraProcedure.procParams.cislo_bedny.val = req.query.cislo_bedny;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
        }
        else if (typeof req.query.registracni_cislo !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getArchivRegCislo);
            oraProcedure.procParams.registracni_cislo.val = req.query.registracni_cislo;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(oraProcedure);
        }
        else if (typeof req.query.cislo_jednaci !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new common_1.OraProcedure(common_1.oraProcs.getArchivCisloJednaci);
            oraProcedure.procParams.cislo_jednaci.val = req.query.cislo_jednaci;
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
//# sourceMappingURL=cissukl_archiv_router.js.map
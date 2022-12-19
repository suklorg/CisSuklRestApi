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
exports.reg_cisla_router = void 0;
const express = require("express");
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
const common_1 = require("../common");
const cis = require("../common");
let reg_cisla_router = express.Router();
exports.reg_cisla_router = reg_cisla_router;
/**
 * @swagger
 * /zmenyregistracnicisla:
 *   get:
 *     tags:
 *       - Registrační čísla
 *     description: Vrací seznam změněných registračních čísel
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: platnost_od
 *         description: Datum
 *         in: query
 *         required:
 *         type: string
 *     responses:
 *       200:
 *         description: Pole registračních čísel
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/ZmenyRegistracniCisla'
 * definition:
 *   ZmenyRegistracniCisla:
 *     type: object
 *     properties:
 *       REGISTRACNI_CISLO:
 *         type: string
 *         description: Registrační číslo - Varchar(16)
 *         example: 87/173/03-C
 *       REGISTRACNI_CISLO_PUVODNI:
 *         type: string
 *         description: Registrační číslo - Varchar(16)
 *         example: 87/173/03-C
 */
reg_cisla_router.get('/zmenyregistracnicisla', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        res.type('application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getZmenyRegistracniCisla);
        }
        else if (typeof req.query.platnost_od !== "undefined" && typeof req.query.platnost_od !== "object" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getZmenyRegistracniCislaPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getZmenyRegistracniCislaPlatnostOd);
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
        if (e instanceof cis.AppError) {
            res.status(e.status).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        else {
            res.status(400).send((0, common_1.FormatExceptionMessage)(e.message));
        }
        ;
        console.log(e.message);
    }
}));
/**
* @swagger
* definition:
*   RegistracniCislaCisloJednaci:
*     type: array
*     items:
*       $ref: '#/definitions/RegistracniCislaCisloJednaciObject'
*       description: Ahoj
*/
/**
 * @swagger
 * definition:
 *   RegistracniCislaCisloJednaciObject:
 *     type: object
 *     properties:
 *       CISLO_JEDNACI:
 *         type: string
 *         description: Číslo jednací - Varchar(12)
 *         example: 10057/04
 *       REGISTRACNI_CISLO:
 *         type: string
 *         description: Registrační číslo - Varchar(16)
 *         example: 87/173/03-C
 *       ASMF_CISLO:
 *         type: string
 *         description: Registrační číslo - Varchar(15)
 *         example: "null"
 *       RC1:
 *         type: string
 *         description: Složka registračního čísla - Varchar(2)
 *         example: "87"
 *       RC2:
 *         type: string
 *         description: Složka registračního čísla - Varchar(4)
 *         example: "173"
 *       RC3:
 *         type: string
 *         description: Složka registračního čísla - Varchar(4)
 *         example: "03"
 *       RC4:
 *         type: string
 *         description: Složka registračního čísla - Varchar(4)
 *         example: "C"
 */
/**
 * @swagger
 * /registracnicisla:
 *   get:
 *     tags:
 *       - Registrační čísla
 *     description: Vrací seznam registračních čísel přiřazených k číslu jednacímu
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: cislo_jednaci
 *         description: Číslo jednací bez lomítka
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Pole registračních čísel
 *         schema:
 *           $ref: '#/definitions/RegistracniCislaCisloJednaci'
 */
reg_cisla_router.get('/registracnicisla', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oraExecuteResult;
    try {
        res.type('application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        if (typeof req.query.cislo_jednaci !== "undefined" && typeof req.query.cislo_jednaci !== "object" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getCislaJednaciCisloJednaci.procParams.cislo_jednaci.val = req.query.cislo_jednaci;
            //logger.info('start registracnicisla param cislo jednaci: ' + req.query.cislo_jednaci);
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCislaJednaciCisloJednaci);
            //logger.info('stop  registracnicisla param cislo jednaci: ' + req.query.cislo_jednaci);
        }
        else if (typeof req.query.mrp_cislo !== "undefined" && typeof req.query.mrp_cislo !== "object" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getCislaJednaciMrpCislo.procParams.mrp_cislo.val = req.query.mrp_cislo;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCislaJednaciMrpCislo);
        }
        else if (typeof req.query.registracni_cislo !== "undefined" && typeof req.query.registracni_cislo !== "object" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getCislaJednaciRegCislo.procParams.registracni_cislo.val = req.query.registracni_cislo;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCislaJednaciRegCislo);
        }
        else if (typeof req.query.uuid !== "undefined" && typeof req.query.uuid !== "object" && Object.keys(req.query).length === 1) {
            common_1.oraProcs.getCislaJednaciUuidCislo.procParams.uuid_cislo.val = req.query.uuid;
            oraExecuteResult = yield (0, common_1.ExecuteProcedure)(common_1.oraProcs.getCislaJednaciUuidCislo);
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
//# sourceMappingURL=cissukl_reg_cisla_router.js.map
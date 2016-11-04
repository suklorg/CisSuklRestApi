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
const oracledb_1 = require("oracledb");
const common_1 = require("../common");
let ectd_router = express.Router();
exports.ectd_router = ectd_router;
ectd_router.get('/registracnicisla', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.type('application/json');
        if (req.query.cislo_jednaci !== "undefined" && typeof req.query.cislo_jednaci !== "object" && Object.keys(req.query).length === 1)
            res.send(yield GetCislaJednaciCisloJednaci(req.query.cislo_jednaci));
        else
            res.status(404).send(common_1.FormatExceptionMessage("Pro dané URL není služba implementována."));
    }
    catch (e) {
        res.status(404).send(common_1.FormatExceptionMessage(e.message));
        console.log(e.message);
    }
}));
function GetCislaJednaciCisloJednaci(cisloJednaci) {
    return __awaiter(this, void 0, Promise, function* () {
        common_1.oraProcs.getCislaJednaciCisloJednaci.procParams.cisloJednaci.val = cisloJednaci;
        let connection = yield oracledb_1.getConnection(common_1.connectionAttributes);
        try {
            let result = yield connection.execute(common_1.oraProcs.getCislaJednaciCisloJednaci.procName, common_1.oraProcs.getCislaJednaciCisloJednaci.procParams, common_1.oraOutFormat);
            return JSON.stringify(yield result.outBinds.cursor.getRows(result.outBinds.count), null, 4);
        }
        finally {
            connection.close();
        }
    });
}
/**
 * @swagger
 * /cislajednaci/:cisloJednaci':
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
////
//*/
//# sourceMappingURL=cissukl_ectd_router.js.map
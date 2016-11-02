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
function GetCislaJednaciCisloJednaci(cisloJednaci) {
    return __awaiter(this, void 0, Promise, function* () {
        //async function GetCislaJednaciCisloJednaci(cisloJednaci: string): Promise<String> {
        let oraParams = {
            cisloJednaci: { val: cisloJednaci, type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
            count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
            cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
        };
        let connection = yield oracledb_1.getConnection(common_1.connectionAttributes);
        try {
            let result = yield connection.execute(common_1.oraProcedures.getCislaJednaciCisloJednaci, oraParams, common_1.oraOutFormat);
            //return await JSON.stringify(result.outBinds.cursor.getRows(result.outBinds.count));
            return yield result.outBinds.cursor.getRows(result.outBinds.count);
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
ectd_router.get('/cislajednaci/:cisloJednaci', (req, res) => __awaiter(this, void 0, Promise, function* () {
    try {
        res.send(yield GetCislaJednaciCisloJednaci(String(req.params.cisloJednaci)));
    }
    catch (e) {
        console.log(e.message);
        res.status(404).send(common_1.FormatExceptionMessage(e.message));
    }
}));
////
//*/
//# sourceMappingURL=cissukl_ectd_router.js.map
"use strict";

import * as express from "express";
import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
import { connectionAttributes, oraProcedures, oraOutFormat, FormatExceptionMessage, oraProcs }  from "../common";
 
let ectd_router: express.Router = express.Router();

ectd_router.get('/registracnicisla', async (req: express.Request, res: express.Response): Promise<void> => {

    try {
        res.type('application/json');
        if (req.query.cislo_jednaci !== "undefined" && typeof req.query.cislo_jednaci !== "object" && Object.keys(req.query).length === 1) 
            res.send(await GetCislaJednaciCisloJednaci(req.query.cislo_jednaci));
        else
            res.status(404).send(FormatExceptionMessage("Pro dané URL není služba implementována."))
    } catch (e) {
        res.status(404).send(FormatExceptionMessage(e.message));
        console.log(e.message);
    }

});

async function GetCislaJednaciCisloJednaci(cisloJednaci: string): Promise<string> {

    oraProcs.getCislaJednaciCisloJednaci.procParams.cisloJednaci.val = cisloJednaci;

    let connection: IConnection = await getConnection(connectionAttributes);
    try {
        let result: any = await connection.execute(oraProcs.getCislaJednaciCisloJednaci.procName, oraProcs.getCislaJednaciCisloJednaci.procParams, oraOutFormat);
        return JSON.stringify(await result.outBinds.cursor.getRows(result.outBinds.count), null, 4);
    } finally {
        connection.close();
    }
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
export { ectd_router };

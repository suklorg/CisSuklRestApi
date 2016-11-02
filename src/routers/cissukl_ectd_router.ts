"use strict";

import * as express from "express";
import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
import { connectionAttributes, oraProcedures, oraOutFormat, FormatExceptionMessage }  from "../common";
    
let ectd_router: express.Router = express.Router();


async function GetCislaJednaciCisloJednaci(cisloJednaci: string): Promise<Array<{}[]>> {
//async function GetCislaJednaciCisloJednaci(cisloJednaci: string): Promise<String> {

    let oraParams = {
        cisloJednaci: { val: cisloJednaci, type: STRING, dir: BIND_IN },
        count: { type: NUMBER, dir: BIND_OUT },
        cursor: { type: CURSOR, dir: BIND_OUT }
    };

    let connection: IConnection = await getConnection(connectionAttributes);
    try {
        let result: any = await connection.execute(oraProcedures.getCislaJednaciCisloJednaci, oraParams, oraOutFormat);
        //return await JSON.stringify(result.outBinds.cursor.getRows(result.outBinds.count));
        return await result.outBinds.cursor.getRows(result.outBinds.count);
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
ectd_router.get('/cislajednaci/:cisloJednaci', async (req: express.Request, res: express.Response): Promise<void> => {

    try {
        res.send(await GetCislaJednaciCisloJednaci(String(req.params.cisloJednaci)));
    } catch (e) {
        console.log(e.message);
        res.status(404).send(FormatExceptionMessage(e.message));
    }

});

////

//*/
export { ectd_router };

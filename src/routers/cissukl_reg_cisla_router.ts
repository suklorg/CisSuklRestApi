"use strict";

import * as express from "express";
//import { getConnection, IConnection, BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
import { FormatExceptionMessage, FormatException, errMessage400, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult/*logger*/ } from "../common";
import * as cis from "../common";
 
let reg_cisla_router: express.Router = express.Router();



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
reg_cisla_router.get('/zmenyregistracnicisla', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: cis.IOraExecuteResult;

    try {
        res.type('application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        if (Object.keys(req.query).length === 0) {
            oraExecuteResult = await ExecuteProcedure(oraProcs.getZmenyRegistracniCisla);
        }
        else if (typeof req.query.platnost_od !== "undefined" && typeof req.query.platnost_od !== "object" && Object.keys(req.query).length === 1) {
            oraProcs.getZmenyRegistracniCislaPlatnostOd.procParams.platnost_od.val = req.query.platnost_od;            
            oraExecuteResult = await ExecuteProcedure(oraProcs.getZmenyRegistracniCislaPlatnostOd);
        }

        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(FormatExceptionMessage(errMessage400))
        }
    } catch (e) {
        if (e instanceof cis.AppError) {
            res.status(e.status).send(FormatExceptionMessage(e.message));
        }
        else {
            res.status(400).send(FormatExceptionMessage(e.message));
        };
        console.log(e.message);
    }

});


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

reg_cisla_router.get('/registracnicisla', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: cis.IOraExecuteResult;

    try {
        res.type('application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');


        if (typeof req.query.cislo_jednaci !== "undefined" && typeof req.query.cislo_jednaci !== "object" && Object.keys(req.query).length === 1) {
            oraProcs.getCislaJednaciCisloJednaci.procParams.cislo_jednaci.val = req.query.cislo_jednaci;
            //logger.info('start registracnicisla param cislo jednaci: ' + req.query.cislo_jednaci);
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCislaJednaciCisloJednaci);
            //logger.info('stop  registracnicisla param cislo jednaci: ' + req.query.cislo_jednaci);

        } else if (typeof req.query.mrp_cislo !== "undefined" && typeof req.query.mrp_cislo !== "object" && Object.keys(req.query).length === 1) {
            oraProcs.getCislaJednaciMrpCislo.procParams.mrp_cislo.val = req.query.mrp_cislo;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCislaJednaciMrpCislo);

        } else if (typeof req.query.registracni_cislo !== "undefined" && typeof req.query.registracni_cislo !== "object" && Object.keys(req.query).length === 1) {
            oraProcs.getCislaJednaciRegCislo.procParams.registracni_cislo.val = req.query.registracni_cislo;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCislaJednaciRegCislo);
        } else if (typeof req.query.uuid !== "undefined" && typeof req.query.uuid !== "object" && Object.keys(req.query).length === 1) {
            oraProcs.getCislaJednaciUuidCislo.procParams.uuid_cislo.val = req.query.uuid;
            oraExecuteResult = await ExecuteProcedure(oraProcs.getCislaJednaciUuidCislo);
        }

        if (typeof oraExecuteResult !== "undefined") {
            res.setHeader('X-Total-Count', oraExecuteResult.count.toString());
            res.send(oraExecuteResult.resultSet);
        }
        else {
            res.status(400).send(FormatExceptionMessage(errMessage400))
        }
    } catch (e) {
        if (e instanceof AppError) {
            res.status(e.status).send(FormatExceptionMessage(e.message));
        }
        else {
            res.status(400).send(FormatExceptionMessage(e.message));
        };
        console.log(e.message);
    }
});



//*/
export { reg_cisla_router };

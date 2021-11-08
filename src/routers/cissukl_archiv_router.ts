"use strict";

import * as express from "express";
import { FormatExceptionMessage, FormatException, errMessage400, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, SetHeader, OraProcedure, connectionAttributes, connectionAttributesDlp } from "../common";
import { IConnectionAttributes, IExecuteOptions, IConnection, getConnection, OBJECT, NUMBER, STRING, DATE, CURSOR, BIND_IN, BIND_OUT } from "oracledb";

let archiv_router: express.Router = express.Router();

archiv_router.post('/archiv', async (req: express.Request, res: express.Response): Promise<void> => {
    null
    let oraExecuteResult: IOraExecuteResult;

    //let connectionAttributes: IConnectionAttributes = { user: "aislp", password: "drdrug", connectString: "dlp" };
    let connection: IConnection = await getConnection(connectionAttributesDlp);

    try {
        res.type('application/json');
        let cisloBedny: string = req.body.cislo_bedny;
        let cisloSsa: string = req.body.cislo_ssa;

        let result: any = await connection.execute('update arch_bedny set ss_id = :cislo_ssa where cislo_bedny = :cislo_bedny', {cislo_ssa: cisloSsa, cislo_bedny: cisloBedny}, { autoCommit: true });

        /*
        let result: any = await connection.execute('insert into dl_bl_uuid (cislo_jednaci, uuid, rg, rsq, ry, rr, registracni_cislo) values (:cislo_jednaci, :uuid, :rg, :rsq, :ry, :rr, :registracni_cislo)',
            { cislo_jednaci: cisloJednaci, uuid: uuid, rg: regCislo.rg, rsq: regCislo.rsq, ry: regCislo.ry, rr: regCislo.rr, registracni_cislo: registracniCislo }, { autoCommit: true });
        */
        res.sendStatus(201);


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



archiv_router.get('/archiv', async (req: express.Request, res: express.Response): Promise<void> => {

    let oraExecuteResult: IOraExecuteResult;
    let oraProcedure: OraProcedure;

    try {
        SetHeader(res);

        if (Object.keys(req.query).length === 0) {
            oraProcedure = new OraProcedure(oraProcs.getArchiv);
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
        }
        else if (typeof req.query.cislo_bedny !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new OraProcedure(oraProcs.getArchivBedna);
            oraProcedure.procParams.cislo_bedny.val = req.query.cislo_bedny;
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
        } 
        else if (typeof req.query.registracni_cislo !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new OraProcedure(oraProcs.getArchivRegCislo);
            oraProcedure.procParams.registracni_cislo.val = req.query.registracni_cislo;
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
        } else if (typeof req.query.cislo_jednaci !== "undefined" && Object.keys(req.query).length === 1) {
            oraProcedure = new OraProcedure(oraProcs.getArchivCisloJednaci);
            oraProcedure.procParams.cislo_jednaci.val = req.query.cislo_jednaci;
            oraExecuteResult = await ExecuteProcedure(oraProcedure);
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

export { archiv_router};

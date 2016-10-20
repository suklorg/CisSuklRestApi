"use strict";


    import * as express from "express";
    import { getConnection, IConnection, IExecuteOptions, IConnectionAttributes, IExecuteReturn, OBJECT } from 'oracledb';

    let ectd_router: express.Router = express.Router();



    let connectString: IConnectionAttributes = { user: "cis_dlp", password: "cis_dlp", connectString: "dlptest" };

    const selRegistracniCislaCisloJednaci: string = "SELECT spisova_znacka as cislo_jednaci, registracni_cislo, asmf_cislo FROM sez_spis_znacky WHERE platnost_do IS NULL AND spisova_znacka = :cisloJednaci";

    async function GetSezRegistracniCislaCisloJednaci(cisloJednaci: string): Promise<Array<{}[]>> {
        let connection = await getConnection(connectString);
        let result: IExecuteReturn = await connection.execute(selRegistracniCislaCisloJednaci, [cisloJednaci], { outFormat: OBJECT });
        return result.rows;
    }


    ectd_router.get('/registracnicisla/cislojednaci/:cisloJednaci', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            res.send(await GetSezRegistracniCislaCisloJednaci(req.params.cisloJednaci));
        } catch (e) {
            let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
            console.log(s);
            //let a: {} = JSON.parse('{ "error" : "' + s + '"}');
            res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
        }

    });

    ////

    //*/
    export { ectd_router };

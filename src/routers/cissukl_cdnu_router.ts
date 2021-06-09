"use strict";


import * as express from "express";
import { FormatExceptionMessage, errMessage400, FormatException, oraProcs, AppError, ExecuteProcedure, IOraExecuteResult, connectionAttributes, connectionAttributesDlp } from "../common";


import { IConnectionAttributes, IExecuteOptions, IConnection,  getConnection, OBJECT, NUMBER, STRING, DATE, CURSOR, BIND_IN, BIND_OUT } from "oracledb";
let cdnu_router: express.Router = express.Router();


interface IRegCislo {
    rg: string,
    rsq: string,
    ry: string,
    rr: string
};

class RegCislo implements IRegCislo {
    rg: string;
    rsq: string;
    ry: string;
    rr: string;
    //constructor() { };
};


cdnu_router.post('/cdnu', async (req: express.Request, res: express.Response): Promise<void> => {
null
    let oraExecuteResult: IOraExecuteResult;

    //let connectionAttributes: IConnectionAttributes = { user: "aislp", password: "drdrug", connectString: "dlptest" };
    //let connectionAttributes: IConnectionAttributes = { user: "aislp", password: "drdrug", connectString: "dlp" };
    let connection: IConnection = await getConnection(connectionAttributesDlp);

    try {
        res.type('application/json');
        let cisloJednaci: number = req.body.cislo_jednaci;
        let uuid: string = req.body.uuid;
        let registracniCislo: string = req.body.registracni_cislo;
        let regCislo: RegCislo = new RegCislo();
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
        let result: any = await connection.execute('insert into dl_bl_uuid (cislo_jednaci, uuid, rg, rsq, ry, rr, registracni_cislo) values (:cislo_jednaci, :uuid, :rg, :rsq, :ry, :rr, :registracni_cislo)',
            { cislo_jednaci: cisloJednaci, uuid: uuid, rg: regCislo.rg, rsq: regCislo.rsq, ry: regCislo.ry, rr: regCislo.rr, registracni_cislo: registracniCislo }, { autoCommit: true });

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


function GetRegCislo(registracniCislo: string): IRegCislo {
    let regCislo: RegCislo = new RegCislo();
    let i, j, k, l: number;

   
    if (registracniCislo.substr(0, 2) == "EU") {
        i = registracniCislo.indexOf("/");
        if (i == -1) return null;
        j = registracniCislo.indexOf("/", i + 1);
        if (j == -1) return null;
        regCislo.rr = "EU" + registracniCislo.substr(i + 1, j - i - 1);
        k = registracniCislo.indexOf("/", j + 1);
        if (k == -1) return null;
        regCislo.rg = registracniCislo.substr(j + 1, k - j - 1);
        l = registracniCislo.indexOf("/", k + 1);
        if (l == -1) return null;
        regCislo.rsq = registracniCislo.substr(k + 1, l - k - 1);
        regCislo.ry = registracniCislo.substr(l + 1, registracniCislo.length - l - 1);
    }
    else {
        i = registracniCislo.indexOf("/");
        if (i == -1) return null;
        regCislo.rg = registracniCislo.substr(0, i);
        j = registracniCislo.indexOf("/", i + 1);
        if (j == -1) return null;
        regCislo.rsq = registracniCislo.substr(i + 1, j - i - 1);
        k = registracniCislo.indexOf("-", j + 1);
        if (k == -1) return null;
        regCislo.ry = registracniCislo.substr(j + 1, k - j - 1);
        regCislo.rr = registracniCislo.substr(k + 1, registracniCislo.length - k - 1);

    }
    return regCislo;


}

export { cdnu_router };

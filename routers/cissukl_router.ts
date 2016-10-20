"use strict";

import * as express from "express";

//import { getLogger } from 'log4js';

var log4js = require('log4js');
var logger = log4js.getLogger();

let oracledb = require('oracledb');

//import * as oracledb from "oracledb";
import {getConnection, IConnection, IExecuteOptions, IExecuteReturn, OBJECT } from 'oracledb';

let connectString = { user: "cis_dlp", password: "cis_dlp", connectString: "dlptest" };

let cis_router: express.Router = express.Router();


class CisAtcRow {
    constructor() { };
    kod_atc: string;
};
/*
async function GetCisAtc(): Promise<Array<CisAtcRow>> {

    try {
        let connection: IConnection = await getConnection({ user: "aislp", password: "drdrug", connectString: "dlp" });;
        //connection = await getConnection({ user: "aislp", password: "drdrug", connectString: "dlp" });
        let result: IExecuteReturn = await connection.execute("SELECT kod AS kod_atc FROM cis_atc@cis_sukl.sukl.cz WHERE plat_do IS NULL ORDER BY kod", [], { outFormat: OBJECT });
        let metaData: any = result.metaData;
        let cisAtcRows: Array<any> = result.rows;
        return cisAtcRows;
        //return metaData;
    } catch (e) {
        console.log(e);
    }
}

router.get('/atc', async (req: express.Request, res: express.Response): Promise<void> => {
    res.send(await GetCisAtc());
});

class CisAtcKodAtcRow {
    constructor() { };
    kod_atc: string;
    nazev: string;
    nazev_en: string;
};


async function GetCisAtcKodAtc(kodAtc: string): Promise<Array<CisAtcKodAtcRow>> {

    try {
        let connection = await oracledb.getConnection({ user: "aislp", password: "drdrug", connectString: "dlp" });
        let result: any = await connection.execute("SELECT kod AS kod_atc, nazev_cz as nazev, nazev_en FROM cis_atc@cis_sukl.sukl.cz WHERE plat_do IS NULL AND kod = :kodAtc", [kodAtc], { outFormat: oracledb.OBJECT });
        let cisAtcKodAtcRows: Array<CisAtcKodAtcRow> = result.rows;
        return cisAtcKodAtcRows;
    } catch (e) {
        console.log(e);
    }
}



router.get('/atc/:kodAtc', async (req: express.Request, res: express.Response): Promise<void> => {
    res.send(await GetCisAtcKodAtc(req.params.kodAtc));
});

*/
//*
/*
const selRegistracniCislaCisloJednaci: string = "SELECT spisova_znacka as cislo_jednaci, registracni_cislo, asmf_cislo FROM sez_spis_znacky WHERE platnost_do IS NULL AND spisova_znacka = :cisloJednaci";

async function GetSezRegistracniCislaCisloJednaci(cisloJednaci: string): Promise<Array<{}[]>> {
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(selRegistracniCislaCisloJednaci, [cisloJednaci], { outFormat: oracledb.OBJECT });
    return result.rows;
}


router.get('/registracnicisla/cislojednaci/:cisloJednaci', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetSezRegistracniCislaCisloJednaci(req.params.cisloJednaci));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        //let a: {} = JSON.parse('{ "error" : "' + s + '"}');
        res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
    }

});

*/
////
const selLecivePripravky: string = "SELECT kod_sukl,nazev,sila,kod_lekova_forma,baleni,kod_cesta_podani,doplnek,kod_obal,registracni_cislo,kod_registracni_procedura,kod_stav_registrace,kod_druh_registrace,kod_organizace_drzitel,kod_zeme_drzitel,kod_organizace_drzitel_sreg_b,kod_zeme_drzitel_sreg_b,soubezny_dovoz,kod_organizace_dovozce,kod_zeme_dovozce,platnost_registrace_do,neomezena_platnost_registrace,uvadeni_do,kod_indikacni_skupina,kod_atc_skupina,ddd_mnozstvi,ddd_jednotka,ddd_baleni,ddd_zdroj,povinne_vzorky,kod_zpusob_vydeje,kod_zavislost,kod_doping,kod_narizeni_vlady,braillovo_pismo,expirace,expirace_jednotka FROM sez_dlp WHERE platnost_do IS NULL ORDER BY nazev,doplnek,kod_sukl";

async function GetLecivePripravky(): Promise<Array<{}[]>> {
    oracledb.maxRows = 100;
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(selLecivePripravky, [], { outFormat: oracledb.OBJECT });
    return result.rows;
}


cis_router.get('/lecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetLecivePripravky());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
    }

});

/////
const selLecivePripravkyKody: string = "SELECT kod_sukl FROM sez_dlp WHERE platnost_do IS NULL ORDER BY kod_sukl";

async function GetLecivePripravkyKody(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let plsql: string = "BEGIN cis_sukl_dlp.GetLecivePripravkyKody(:cursor); END;";
    let bindvars = {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(plsql, bindvars, { outFormat: oracledb.OBJECT });
    //let result: any = await connection.execute(selLecivePripravkyKody, [], { resultSet: true, outFormat: oracledb.OBJECT });
    //return await c;
    //return await result.outBinds.cursor.getRows;
    result.rows = await result.outBinds.cursor.getRows(100);   
    //result.rows = await result.outBinds.cursor.getRows(1);   
    //result.outBinds.cursor.close();
    //connection.close();
    //return result.outBinds.cursor.getRows(100);
    return result.rows;
    //return result.resultSet.getRow();
}


cis_router.get('/lecivepripravky/kody', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetLecivePripravkyKody());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }

});

/////

const selLecivePripravkyKodSukl: string = "SELECT kod_sukl, nazev, sila, kod_lekova_forma, baleni, kod_cesta_podani, doplnek, kod_obal, registracni_cislo, kod_registracni_procedura, kod_stav_registrace, kod_druh_registrace, kod_organizace_drzitel, kod_zeme_drzitel, kod_organizace_drzitel_sreg_b, kod_zeme_drzitel_sreg_b, soubezny_dovoz, kod_organizace_dovozce, kod_zeme_dovozce, platnost_registrace_do, neomezena_platnost_registrace, uvadeni_do, kod_indikacni_skupina, kod_atc_skupina, ddd_mnozstvi, ddd_jednotka, ddd_baleni, ddd_zdroj, povinne_vzorky, kod_zpusob_vydeje, kod_zavislost, kod_doping, kod_narizeni_vlady, braillovo_pismo, expirace, expirace_jednotka FROM sez_dlp WHERE platnost_do IS NULL AND kod_sukl = :kodSukl";

async function GetLecivePripravkyKodSukl(kodSukl: string): Promise<Array<{}[]>> {
    oracledb.maxRows = 100;
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(selLecivePripravkyKodSukl, [kodSukl], { outFormat: oracledb.OBJECT });
    return result.rows;
}


cis_router.get('/lecivepripravky/:kodSukl', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetLecivePripravkyKodSukl(req.params.kodSukl));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }

});


/////
// stavy registrace
////

async function GetStavyRegistrace(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetStavyRegistrace(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/stavyregistrace', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetStavyRegistrace());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


/////

async function GetStavyRegistraceKody(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetStavyRegistraceKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/stavyregistrace/kody', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetStavyRegistraceKody());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});



/////


async function GetStavyRegistraceKodStavRegistrace(kodStavRegistrace: string): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetStavyRegistraceKodStavReg(:kodStavRegistrace, :cursor); END;";
    let oraParameters = {
        kodStavRegistrace: { val: kodStavRegistrace, type: oracledb.STRING, dir: oracledb.BIND_IN },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(1);
    return result.rows;
}


cis_router.get('/stavyregistrace/kodstavregistrace/:kodStavRegistrace', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetStavyRegistraceKodStavRegistrace(req.params.kodStavRegistrace));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});



/////
// atc skupiny
////

async function GetAtcSkupiny(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetAtcSkupiny(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/atcskupiny', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetAtcSkupiny());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


////

async function GetAtcSkupinyKody(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetAtcSkupinyKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/atcskupinykody', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetAtcSkupinyKody());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


/////


async function GetAtcSkupinyKodAtcSkupina(kodAtcSkupina: string): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetAtcSkupinyKodAtcSkupina(:kodAtcSkupina, :cursor); END;";
    let oraParameters = {
        kodAtcSkupina: { val: kodAtcSkupina, type: oracledb.STRING, dir: oracledb.BIND_IN },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(1);
    return result.rows;
}


cis_router.get('/atcskupiny/kodatcskupina/:kodAtcSkupina', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetAtcSkupinyKodAtcSkupina(req.params.kodAtcSkupina));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


/////
// indikacni skupiny
////

async function GetIndikacniSkupiny(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetIndikacniSkupiny(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/indikacniskupiny', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetIndikacniSkupiny());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


////

async function GetIndikacniSkupinyKody(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetIndikacniSkupinyKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/indikacniskupiny/kody', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetIndikacniSkupinyKody());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});



/////

async function GetIndikacniSkupinyKodIndikacniSkupina(kodIndikacniSkupina: number): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetIndikacniSkupinyKodIndSkup(:kodIndikacniSkupina, :cursor); END;";
    let oraParameters = {
        kodIndikacniSkupina: { val: kodIndikacniSkupina, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        //connection = await oracledb.getConnection(connectString);
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        result.rows = await result.outBinds.cursor.getRows(1);
        return result.rows;
    } finally {
        connection.close();
    }
}


cis_router.get('/indikacniskupiny/kodindikacniskupina/:kodIndikacniSkupina', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetIndikacniSkupinyKodIndikacniSkupina(Number(req.params.kodIndikacniSkupina)));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});

/////
// ucinne latky
////

async function GetUcinneLatky(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetUcinneLatky(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        
    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/ucinnelatky', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetUcinneLatky());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


/////

async function GetUcinneLatkyKody(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetUcinneLatkyKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/ucinnelatky/kody', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetUcinneLatkyKody());
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});



/////


async function GetUcinneLatkyKodUcinnaLatka(kodUcinnaLatka: number): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetUcinneLatkyKodUcinnaLatka(:kodUcinnaLatka,  :cursor); END;";
    let oraParameters = {
        kodUcinnaLatka: { val: kodUcinnaLatka },
        //count: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(1);
    return result.rows;
}


cis_router.get('/ucinnelatky/koducinnalatka/:kodUcinnaLatka', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetUcinneLatkyKodUcinnaLatka(req.params.kodUcinnaLatka));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


/////


async function GetUcinneLatkyKodSukl(kodSukl : number): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetUcinneLatkyKodSukl(:kodSukl, :count, :cursor); END;";
    let oraParameters = {
        kodSukl: { val: kodSukl},
        count: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters , { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
    return result.rows;
}


cis_router.get('/ucinnelatky/kodsukl/:kodSukl', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.send(await GetUcinneLatkyKodSukl(req.params.kodSukl));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});

//*/
export { cis_router};

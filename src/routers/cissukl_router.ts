"use strict";

import * as express from "express";

//import { getLogger } from 'log4js';

var log4js = require('log4js');
var logger = log4js.getLogger();

let oracledb = require('oracledb');

//import * as oracledb from "oracledb";
//import {getConnection, IConnection, IExecuteOptions, IExecuteReturn, OBJECT } from 'oracledb';

let connectString = { user: "cis_sukl", password: "cis_sukl", connectString: "dlptest" };

let cis_router: express.Router = express.Router();



//const selLecivePripravky: string = "SELECT kod_sukl,nazev,sila,kod_lekova_forma,baleni,kod_cesta_podani,doplnek,kod_obal,registracni_cislo,kod_registracni_procedura,kod_stav_registrace,kod_druh_registrace,kod_organizace_drzitel,kod_zeme_drzitel,kod_organizace_drzitel_sreg_b,kod_zeme_drzitel_sreg_b,soubezny_dovoz,kod_organizace_dovozce,kod_zeme_dovozce,platnost_registrace_do,neomezena_platnost_registrace,uvadeni_do,kod_indikacni_skupina,kod_atc_skupina,ddd_mnozstvi,ddd_jednotka,ddd_baleni,ddd_zdroj,povinne_vzorky,kod_zpusob_vydeje,kod_zavislost,kod_doping,kod_narizeni_vlady,braillovo_pismo,expirace,expirace_jednotka FROM sez_dlp WHERE platnost_do IS NULL ORDER BY nazev,doplnek,kod_sukl";

async function GetLecivePripravky(): Promise<Array<{}[]>> {
    /*
    oracledb.maxRows = 100;
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(selLecivePripravky, [], { outFormat: oracledb.OBJECT });
    return result.rows;
    */

    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetLecivePripravky(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));
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
//const selLecivePripravkyKody: string = "SELECT kod_sukl FROM sez_dlp WHERE platnost_do IS NULL ORDER BY kod_sukl";

async function GetLecivePripravkyKody(): Promise<Array<{}[]>> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetLecivePripravkyKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(Number(result.outBinds.count));   
    return result.rows;
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

//const selLecivePripravkyKodSukl: string = "SELECT kod_sukl, nazev, sila, kod_lekova_forma, baleni, kod_cesta_podani, doplnek, kod_obal, registracni_cislo, kod_registracni_procedura, kod_stav_registrace, kod_druh_registrace, kod_organizace_drzitel, kod_zeme_drzitel, kod_organizace_drzitel_sreg_b, kod_zeme_drzitel_sreg_b, soubezny_dovoz, kod_organizace_dovozce, kod_zeme_dovozce, platnost_registrace_do, neomezena_platnost_registrace, uvadeni_do, kod_indikacni_skupina, kod_atc_skupina, ddd_mnozstvi, ddd_jednotka, ddd_baleni, ddd_zdroj, povinne_vzorky, kod_zpusob_vydeje, kod_zavislost, kod_doping, kod_narizeni_vlady, braillovo_pismo, expirace, expirace_jednotka FROM sez_dlp WHERE platnost_do IS NULL AND kod_sukl = :kodSukl";

async function GetLecivePripravkyKodSukl(kodSukl: string): Promise<Array<{}[]>> {
    /*
    oracledb.maxRows = 100;
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(selLecivePripravkyKodSukl, [kodSukl], { outFormat: oracledb.OBJECT });
    return result.rows;
    */

    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetLecivePripravkyKodSukl(:kodSukl, :cursor); END;";
    let oraParameters = {
        kodSukl: { val: kodSukl, type: oracledb.STRING, dir: oracledb.BIND_IN },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
    result.rows = await result.outBinds.cursor.getRows(1);
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


cis_router.get('/stavyregistrace/:kodStavRegistrace', async (req: express.Request, res: express.Response): Promise<void> => {
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


cis_router.get('/atcskupiny/kody', async (req: express.Request, res: express.Response): Promise<void> => {
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


cis_router.get('/atcskupiny/:kodAtcSkupina', async (req: express.Request, res: express.Response): Promise<void> => {
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


cis_router.get('/indikacniskupiny/:kodIndikacniSkupina', async (req: express.Request, res: express.Response): Promise<void> => {
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


cis_router.get('/ucinnelatky/:kodUcinnaLatka', async (req: express.Request, res: express.Response): Promise<void> => {
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

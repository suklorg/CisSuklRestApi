"use strict";

import * as express from "express";
import { connectionAttributes, oraOutFormat, FormatExceptionMessage, errMessage400, oraProcs }  from "../common";

//import { getLogger } from 'log4js';

var log4js = require('log4js');
var logger = log4js.getLogger();

let oracledb = require('oracledb');

//import * as oracledb from "oracledb";
//import {getConnection, IConnection, IExecuteOptions, IExecuteReturn, OBJECT } from 'oracledb';

let connectString = { user: "cis_sukl", password: "cis_sukl", connectString: "dlptest" };

let ciselniky_router: express.Router = express.Router();

/////
// lecive pripravky
////

/*
ciselniky_router.get('/lecivepripravky', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            res.send(await GetLecivePripravky());
        }
        else if (req.query.fields === "kod_sukl" && Object.keys(req.query).length === 1) {
            res.send(await GetLecivePripravkyKody());
        } else {
            res.status(404).send(FormatExceptionMessage(errMessage400));
        }

    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "error" : "' + s + '"}'));
    }

});


async function GetLecivePripravky(): Promise<string> {

    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetLecivePripravky(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}


/////

async function GetLecivePripravkyKody(): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetLecivePripravkyKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}




/////


ciselniky_router.get('/lecivepripravky/:kodSukl', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        res.send(await GetLecivePripravkyKodSukl(req.params.kodSukl));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }

});

async function GetLecivePripravkyKodSukl(kodSukl: string): Promise<string> {

    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetLecivePripravkyKodSukl(:kodSukl, :cursor); END;";
    let oraParameters = {
        kodSukl: { val: kodSukl, type: oracledb.STRING, dir: oracledb.BIND_IN },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(1)), null, 4);
    } finally {
        connection.close();
    }
}

*/
/////
// stavy registrace
////

/*
ciselniky_router.get('/stavyregistrace', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            res.send(await GetStavyRegistrace());
        }
        else if (req.query.fields === "kod_stav_registrace" && Object.keys(req.query).length === 1) {
            res.send(await GetStavyRegistraceKody());
        } else {
            res.status(404).send(FormatExceptionMessage(errMessage400));
        }
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});



async function GetStavyRegistrace(): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetStavyRegistrace(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}



/////

async function GetStavyRegistraceKody(): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetStavyRegistraceKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}



/////

ciselniky_router.get('/stavyregistrace/:kodStavRegistrace', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        res.send(await GetStavyRegistraceKodStavRegistrace(req.params.kodStavRegistrace));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


async function GetStavyRegistraceKodStavRegistrace(kodStavRegistrace: string): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetStavyRegistraceKodStavReg(:kodStavRegistrace, :cursor); END;";
    let oraParameters = {
        kodStavRegistrace: { val: kodStavRegistrace, type: oracledb.STRING, dir: oracledb.BIND_IN },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(1)), null, 4);
    } finally {
        connection.close();
    }
}



*/

/////
// atc skupiny
////

ciselniky_router.get('/atcskupiny', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            res.send(await GetAtcSkupiny());
        }
        else if (req.query.fields === "kod_atc_skupina" && Object.keys(req.query).length === 1) {
            res.send(await GetAtcSkupinyKody());
        } else {
            res.status(404).send(FormatExceptionMessage(errMessage400));
        }

    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});
//*/

async function GetAtcSkupiny(): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetAtcSkupiny(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}

////
async function GetAtcSkupinyKody(): Promise<string> {
   
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetAtcSkupinyKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}


/////

ciselniky_router.get('/atcskupiny/:kodAtcSkupina', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        res.send(await GetAtcSkupinyKodAtcSkupina(req.params.kodAtcSkupina));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});

async function GetAtcSkupinyKodAtcSkupina(kodAtcSkupina: string): Promise<string> {

    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetAtcSkupinyKodAtcSkupina(:kodAtcSkupina, :cursor); END;";
    let oraParameters = {
        kodAtcSkupina: { val: kodAtcSkupina, type: oracledb.STRING, dir: oracledb.BIND_IN },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(1)), null, 4);
    } finally {
        connection.close();
    }

}

/////
// indikacni skupiny
////

ciselniky_router.get('/indikacniskupiny', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            res.send(await GetIndikacniSkupiny());
        }
        else if (req.query.fields === "kod_indikacni_skupina" && Object.keys(req.query).length === 1) {
            res.send(await GetIndikacniSkupinyKody());
        } else {
            res.status(404).send(FormatExceptionMessage(errMessage400));
        }
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


async function GetIndikacniSkupiny(): Promise<string> {
    
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetIndikacniSkupiny(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}

////

async function GetIndikacniSkupinyKody(): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetIndikacniSkupinyKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}

/////
ciselniky_router.get('/indikacniskupiny/:kodIndikacniSkupina', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        res.send(await GetIndikacniSkupinyKodIndikacniSkupina(Number(req.params.kodIndikacniSkupina)));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


async function GetIndikacniSkupinyKodIndikacniSkupina(kodIndikacniSkupina: number): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetIndikacniSkupinyKodIndSkup(:kodIndikacniSkupina, :cursor); END;";
    let oraParameters = {
        kodIndikacniSkupina: { val: kodIndikacniSkupina, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(1)), null, 4);
    } finally {
        connection.close();
    }
}


/////
// ucinne latky
////

ciselniky_router.get('/ucinnelatky', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        if (Object.keys(req.query).length === 0) {
            res.send(await GetUcinneLatky());
        }
        else if (req.query.fields === "kod_ucinna_latka" && Object.keys(req.query).length === 1) {
            res.send(await GetUcinneLatkyKody());
        }
        else if (typeof req.query.kod_sukl !== "undefined" && typeof req.query.kod_sukl !== "object" && Object.keys(req.query).length === 1) {
            res.send(await GetUcinneLatkyKodSukl(req.query.kod_sukl));
        } else {
            res.status(404).send(FormatExceptionMessage(errMessage400));
        }

    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});


async function GetUcinneLatky(): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetUcinneLatky(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        
    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}



/////

async function GetUcinneLatkyKody(): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetUcinneLatkyKody(:count, :cursor); END;";
    let oraParameters = {
        count: { type: oracledb.PLS_INTEGER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}

async function GetUcinneLatkyKodSukl(kodSukl: number): Promise<string> {
    //oracledb.maxRows = 1000;
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetUcinneLatkyKodSukl(:kodSukl, :count, :cursor); END;";
    let oraParameters = {
        kodSukl: { val: kodSukl },
        count: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(result.outBinds.count)), null, 4);
    } finally {
        connection.close();
    }
}



/////
ciselniky_router.get('/ucinnelatky/:kodUcinnaLatka', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.type('application/json');
        res.send(await GetUcinneLatkyKodUcinnaLatka(req.params.kodUcinnaLatka));
    } catch (e) {
        let s: string = e.message.replace(/"/g, '\\\"').replace(/\n/g, '');
        console.log(s);
        res.status(404).send(JSON.parse('{ "status" : "404", "error" : "' + s + '"}'));
    }
});



async function GetUcinneLatkyKodUcinnaLatka(kodUcinnaLatka: number): Promise<string> {
    
    let oraProcedure: string = "BEGIN cis_sukl_dlp.GetUcinneLatkyKodUcinnaLatka(:kodUcinnaLatka, :cursor); END;";
    let oraParameters = {
        kodUcinnaLatka: { val: kodUcinnaLatka },
        //count: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }

    };
    let connection = await oracledb.getConnection(connectString);
    try {
        let result: any = await connection.execute(oraProcedure, oraParameters, { outFormat: oracledb.OBJECT });
        return JSON.stringify(await result.outBinds.cursor.getRows(Number(1)), null, 4);
    } finally {
        connection.close();
    }
}



/////



//*/
export { ciselniky_router};

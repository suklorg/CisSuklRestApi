"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const oracledb_1 = require("oracledb");
let oracledb = require('oracledb');
let buffer = require('buffer');
let environment = process.env.NODE_ENV;
//let environment = 'test';
var common;
(function (common) {
    class AppError {
        constructor(status, message) {
            this.name = 'AppError';
            this.status = status;
            this.message = message;
        }
        toString() {
            return this.name + ': ' + this.message;
        }
    }
    common.AppError = AppError;
    if (environment == 'test') {
        common.connectionAttributes = {
            user: 'cis_sukl',
            password: 'cis_sukl',
            connectString: '(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(COMMUNITY=TCP)(PROTOCOL=TCP)(Host=test-s-dlp-db.sukl.cz)(Port = 1521)))(CONNECT_DATA=(SID=AISLP)(GLOBAL_NAME=DLPTEST)))'
        };
        common.connectionAttributesDlp = {
            user: 'aislp',
            password: 'drdrug',
            connectString: '(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(COMMUNITY=TCP)(PROTOCOL=TCP)(Host=test-s-dlp-db.sukl.cz)(Port = 1521)))(CONNECT_DATA=(SID=AISLP)(GLOBAL_NAME=DLPTEST)))'
        };
    }
    else if (environment == 'production') {
        common.connectionAttributes = {
            user: 'cis2016',
            password: 'Amtax67779',
            connectString: '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (COMMUNITY = TCP)(PROTOCOL = TCP)(Host = s-util.sukl.cz)(Port = 1521)))(CONNECT_DATA = (SID = UTIL)(GLOBAL_NAME = UTIL)))'
        };
        common.connectionAttributesDlp = {
            user: 'aislp',
            password: 'drdrug',
            connectString: '(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(COMMUNITY=TCP)(PROTOCOL=TCP)(Host=s-dlp-db.sukl.cz)(Port = 1521)))(CONNECT_DATA=(SID=AISLP)(GLOBAL_NAME=DLPTEST)))'
        };
    }
    //*/
    //let connAttributes = new ConnectionAttributes(connectionAttributes);
    //let connAttributesDlp = new ConnectionAttributes(connectionAttributesDlp);
    /*
        export const connectionAttributes: IConnectionAttributes = {
            user: (<any>connAttributes).user,
            password: (<any>connAttributes).password,
            connectString: (<any>connAttributes).connectString
        };
    
        export const connectionAttributesDlp: IConnectionAttributes = {
            user: (<any>connAttributesDlp).user,
            password: (<any>connAttributesDlp).password,
            connectString: (<any>connAttributesDlp).connectString
        }
        
    //*/
    /*
        export const connectionAttributes: IConnectionAttributes = {
            user: "cis2016",
            password: "Amtax67779",
            connectString: "util"
        };
    /*/
    /*
        export const connectionAttributes: IConnectionAttributes = {
            user: "cis_sukl",
            password: "cis_sukl",
            connectString: "dlptest"
        };
    //*/
    common.oraOutFormat = {
        outFormat: oracledb_1.OBJECT
    };
    /*
    export const oraProcedures = {
        getCislaJednaciCisloJednaci:  "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cisloJednaci, :count, :cursor ); END;"

    };
    */
    common.errMessage400 = "Pro dané URL není služba implementována.";
    common.defOffset = 0;
    common.defLimit = 20;
    ;
    class ProcParamsItems {
        //constructor(val: any, type: string, dir: string)
        constructor(procParamsItems) {
            if (procParamsItems.val)
                this.val = procParamsItems.val;
            this.type = procParamsItems.type;
            this.dir = procParamsItems.dir;
        }
    }
    common.ProcParamsItems = ProcParamsItems;
    ;
    class ProcParams {
        constructor(procParams) {
            if (procParams.ico)
                this.ico = new ProcParamsItems(procParams.ico);
            if (procParams.nazev)
                this.nazev = new ProcParamsItems(procParams.nazev);
            if (procParams.cislo_bedny)
                this.cislo_bedny = new ProcParamsItems(procParams.cislo_bedny);
            if (procParams.registracni_cislo)
                this.registracni_cislo = new ProcParamsItems(procParams.registracni_cislo);
            if (procParams.cislo_jednaci)
                this.cislo_jednaci = new ProcParamsItems(procParams.cislo_jednaci);
            if (procParams.kod_sukl)
                this.kod_sukl = new ProcParamsItems(procParams.kod_sukl);
            if (procParams.kod_obal)
                this.kod_obal = new ProcParamsItems(procParams.kod_obal);
            if (procParams.stavy_registrace)
                this.stavy_registrace = new ProcParamsItems(procParams.stavy_registrace);
            if (procParams.offset)
                this.offset = new ProcParamsItems(procParams.offset);
            if (procParams.limit)
                this.limit = new ProcParamsItems(procParams.limit);
            if (procParams.total_count)
                this.total_count = new ProcParamsItems(procParams.total_count);
            this.count = new ProcParamsItems(procParams.count);
            this.cursor = new ProcParamsItems(procParams.cursor);
        }
    }
    common.ProcParams = ProcParams;
    ;
    class OraProcedure {
        constructor(oraProcedure) {
            this.procName = oraProcedure.procName;
            this.procParams = new ProcParams(oraProcedure.procParams);
        }
    }
    common.OraProcedure = OraProcedure;
    ;
    ;
    class OraExecuteResult {
        constructor() { }
        ;
    }
    function ExecuteProcedure(oraProcedure) {
        return __awaiter(this, void 0, void 0, function* () {
            //logger.info('start ExecuteProcedure ' + oraProcedure.procName);
            let oraExecuteResult = new OraExecuteResult();
            let connection = yield (0, oracledb_1.getConnection)(common.connectionAttributes);
            try {
                let result = yield connection.execute(oraProcedure.procName, oraProcedure.procParams, common.oraOutFormat);
                //logger.info('exec  ExecuteProcedure ' + oraProcedure.procName);
                //logger.info('exec  ExecuteParams ' + oraProcedure.procParams);
                oraExecuteResult.count = result.outBinds.count;
                oraExecuteResult.totalCount = result.outBinds.total_count;
                if (oraExecuteResult.count <= 0) {
                    throw new AppError(404, 'Nenalezeny žádné záznamy.');
                }
                /*
                            var obj = await result.outBinds.cursor.getRows(result.outBinds.count);
                            var i: number;
                            var resultSetJson: string;
                            resultSetJson = '[';
                            for (i = 0; i < obj.length; i++)
                            {
                                resultSetJson = resultSetJson + JSON.stringify(obj[i], null, 4);
                                if (i < (obj.length - 1))
                                {
                                    resultSetJson = resultSetJson + ',';
                                }
                            }
                            resultSetJson = resultSetJson  + ']';
                
                            oraExecuteResult.resultSet = resultSetJson;
                */
                //puvodní volani
                oraExecuteResult.resultSet = JSON.stringify(yield result.outBinds.cursor.getRows(result.outBinds.count), null, 4);
                //logger.info(oraExecuteResult.resultSet);
                return oraExecuteResult;
            }
            finally {
                connection.close();
                //logger.info('end   ExecuteProcedure ' + oraProcedure.procName);
            }
        });
    }
    common.ExecuteProcedure = ExecuteProcedure;
    ;
    function SetHeader(res) {
        res.type('application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    common.SetHeader = SetHeader;
    ;
    common.oraProcs = {
        getDistributori: {
            procName: "BEGIN cis_sukl_Distributori.GetDistributori( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getDistributoriIco: {
            procName: "BEGIN cis_sukl_Distributori.GetDistributoriIco( :ico, :count, :cursor ); END;",
            procParams: {
                ico: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getDistributoriNazev: {
            procName: "BEGIN cis_sukl_Distributori.GetDistributoriNazev( :nazev, :count, :cursor ); END;",
            procParams: {
                nazev: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getArchiv: {
            procName: "BEGIN cis_sukl_archiv.GetArchiv( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getArchivBedna: {
            procName: "BEGIN cis_sukl_archiv.GetArchivBedna( :cislo_bedny, :count, :cursor ); END;",
            procParams: {
                cislo_bedny: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getArchivCisloJednaci: {
            procName: "BEGIN cis_sukl_archiv.GetArchivCisloJednaci( :cislo_jednaci, :count, :cursor ); END;",
            procParams: {
                cislo_jednaci: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getArchivRegCislo: {
            procName: "BEGIN cis_sukl_archiv.GetArchivRegCislo( :registracni_cislo, :count, :cursor ); END;",
            procParams: {
                registracni_cislo: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getObaly: {
            procName: "BEGIN cis_sukl_cis.GetObaly( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getObalyKody: {
            procName: "BEGIN cis_sukl_cis.GetObalyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getObalyKodObal: {
            procName: "BEGIN cis_sukl_cis.GetObalyKodObal( :kod_obal, :count, :cursor ); END;",
            procParams: {
                kod_obal: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getRegistracniProcedury: {
            procName: "BEGIN cis_sukl_cis.GetRegistracniProcedury( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getRegistracniProceduryKody: {
            procName: "BEGIN cis_sukl_cis.GetRegistracniProceduryKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getRegistracniProceduryKodRegistracniProcedura: {
            procName: "BEGIN cis_sukl_cis.GetRegistracniProceduryKodRegP( :kod_registracni_procedura, :count, :cursor ); END;",
            procParams: {
                kod_registracni_procedura: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCestyPodani: {
            procName: "BEGIN cis_sukl_cis.GetCestyPodani( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCestyPodaniKody: {
            procName: "BEGIN cis_sukl_cis.GetCestyPodaniKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCestyPodaniKodCestaPodani: {
            procName: "BEGIN cis_sukl_cis.GetCestyPodaniKodCesPod( :kod_cesta_podani, :count, :cursor ); END;",
            procParams: {
                kod_cesta_podani: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekoveFormy: {
            procName: "BEGIN cis_sukl_cis.GetLekoveFormy( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekoveFormyKody: {
            procName: "BEGIN cis_sukl_cis.GetLekoveFormyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekoveFormyKodLekovaForma: {
            procName: "BEGIN cis_sukl_cis.GetLekoveFormyKodLekForm( :kod_lekova_forma, :count, :cursor ); END;",
            procParams: {
                kod_lekova_forma: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravky3: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravky3( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravky3Kody: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravky3Kody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravky3KodSukl: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravky3KodSukl( :kod_sukl, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravky2: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravky2( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravky2Kody: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravky2Kody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravky2KodSukl: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravky2KodSukl( :kod_sukl, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getSodLecivePripravky: {
            procName: "BEGIN cis_sukl_lp.GetSodLecivePripravky( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getSodLecivePripravkyKody: {
            procName: "BEGIN cis_sukl_lp.GetSodLecivePripravkyKody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getSodLecivePripravkyKodSukl: {
            procName: "BEGIN cis_sukl_lp.GetSodLecivePripravkyKodSukl( :kod_sukl, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkySRegScau: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravkySRegScau( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkyKodySRegScau: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravkyKodySRegScau( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkyKodSuklSRegScau: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyKodSuklSRegScau( :kod_sukl, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkyKodSukl: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravkyKodSukl( :kod_sukl, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getParalelniKodyKodSuklScau: {
            procName: "BEGIN cis_sukl_pk.GetParKodyKodSuklScau(:kod_sukl, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCenyPuvodce: {
            procName: "BEGIN cis_sukl_cp.GetCenyPuvodce( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCenyPuvodceKody: {
            procName: "BEGIN cis_sukl_cp.GetCenyPuvodceKody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCenyPuvodceKodSukl: {
            procName: "BEGIN cis_sukl_cp.GetCenyPuvodceKodSukl( :kod_sukl, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getScau: {
            procName: "BEGIN cis_sukl_scau.GetScau( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getScauKody: {
            procName: "BEGIN cis_sukl_scau.GetScauKody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getScauKodSukl: {
            procName: "BEGIN cis_sukl_scau.GetScauKodSukl( :kod_sukl, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getScauKodSuklObdobi: {
            procName: "BEGIN cis_sukl_scau.GetScauKodSuklObdobi( :kod_sukl, :obdobi, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                obdobi: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getOrganizace: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizace( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getOrganizaceKody: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceKody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getOrganizaceKodOrganizace: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceKodOrganizace( :kod_organizace, :count, :cursor ); END;",
            procParams: {
                kod_organizace: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getOrganizaceJeDrzitel: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceJeDrzitel( :je_drzitel, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_drzitel: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getOrganizaceKodyJeDrzitel: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceKodyJeDrzitel( :je_drzitel, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_drzitel: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getOrganizaceJeVyrobce: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceJeVyrobce( :je_vyrobce, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_vyrobce: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getOrganizaceKodyJeVyrobce: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceKodyJeVyrobce( :je_vyrobce, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_vyrobce: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getUcinneLatky: {
            procName: "BEGIN cis_sukl_cis.GetUcinneLatky( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getUcinneLatkyKody: {
            procName: "BEGIN cis_sukl_cis.GetUcinneLatkyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getUcinneLatkyKodUcinnaLatka: {
            procName: "BEGIN cis_sukl_cis.GetUcinneLatkyKodUcinnaLatka( :kod_ucinna_latka, :count, :cursor ); END;",
            procParams: {
                kod_ucinna_latka: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getUcinneLatkyKodSukl: {
            procName: "BEGIN cis_sukl_cis.GetUcinneLatkyKodSukl( :kod_sukl, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getSlozeniLecivePripravky: {
            procName: "BEGIN cis_sukl_lp.GetSlozeniLecivePripravky( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getSlozeniLecivePripravkyKodSukl: {
            procName: "BEGIN cis_sukl_lp.GetSlozeniLecPripravkyKodSukl( :kod_sukl, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getAtcSkupiny: {
            procName: "BEGIN cis_sukl_cis.GetAtcSkupiny( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getAtcSkupinyKody: {
            procName: "BEGIN cis_sukl_cis.GetAtcSkupinyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getAtcSkupinyKodAtcSkupina: {
            procName: "BEGIN cis_sukl_cis.GetAtcSkupinyKodAtcSkupina( :kod_atc_skupina, :count, :cursor ); END;",
            procParams: {
                kod_atc_skupina: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getIndikacniSkupiny: {
            procName: "BEGIN cis_sukl_cis.GetIndikacniSkupiny( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getIndikacniSkupinyKody: {
            procName: "BEGIN cis_sukl_cis.GetIndikacniSkupinyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getIndikacniSkupinyKodIndikacniSkupina: {
            procName: "BEGIN cis_sukl_cis.GetIndikacniSkupinyKodIndSkup( :kod_indikacni_skupina, :count, :cursor ); END;",
            procParams: {
                kod_indikacni_skupina: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getStavyRegistrace: {
            procName: "BEGIN cis_sukl_cis.GetStavyRegistrace( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getStavyRegistraceKody: {
            procName: "BEGIN cis_sukl_cis.GetStavyRegistraceKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getStavyRegistraceKodStavRegistrace: {
            procName: "BEGIN cis_sukl_cis.GetStavyRegistraceKodStavReg( :kod_stav_registrace, :count, :cursor ); END;",
            procParams: {
                kod_stav_registrace: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getDis13Kody: {
            procName: "BEGIN cis_sukl_dis13.GetDis13Kody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkyKodyKodDrzitele: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyKodyKodDrzitele( :je_regulovany, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_drzitele: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkyKodyJeRegulovany: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyKodyJeRegul( :je_regulovany, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_regulovany: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkyKodyPlatnostOd: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyKodyPlatnostOd( :platnost_od, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                platnost_od: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkyPlatnostOd: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyPlatnostOd( :platnost_od, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                platnost_od: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravky: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravky( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLecivePripravkyKody: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravkyKody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                limit: { val: 5, type: oracledb_1.NUMBER, dir: oracledb_1.BIND_IN },
                total_count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getNeregistrovaneLecivePripravky: {
            procName: "BEGIN cis_sukl_lp.GetNeregLecPripravky( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getNeregistrovaneLecivePripravkyObdobiOd: {
            procName: "BEGIN cis_sukl_lp.GetNeregLecPripravkyObdobiOd( :obdobi_od, :count, :cursor ); END;",
            procParams: {
                obdobi_od: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarny: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarny( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarnyKody: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarnyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarnyStatus: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarnyStatus( :status, :count, :cursor ); END;",
            procParams: {
                status: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarnyKodyStatus: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarnyKodyStatus( :status, :count, :cursor ); END;",
            procParams: {
                status: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarnyKodPracoviste: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarnyKodPracoviste( :kod_pracoviste, :count, :cursor ); END;",
            procParams: {
                kod_pracoviste: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCislaJednaciCisloJednaci: {
            procName: "BEGIN cis_sukl_reg_cisla.GetCislaJednaciCisJednaci( :cislo_jednaci, :count, :cursor ); END;",
            procParams: {
                cislo_jednaci: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCislaJednaciMrpCislo: {
            procName: "BEGIN cis_sukl_reg_cisla.GetCislaJednaciMrpCislo( :mrp_cislo, :count, :cursor ); END;",
            procParams: {
                mrp_cislo: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCislaJednaciRegCislo: {
            procName: "BEGIN cis_sukl_reg_cisla.GetCislaJednaciRegCislo( :registracni_cislo, :count, :cursor ); END;",
            procParams: {
                registracni_cislo: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCislaJednaciUuidCislo: {
            procName: "BEGIN cis_sukl_reg_cisla.GetCislaJednaciUuidCislo( :uuid_cislo, :count, :cursor ); END;",
            procParams: {
                uuid_cislo: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getZmenyRegistracniCisla: {
            procName: "BEGIN cis_sukl_reg_cisla.GetZmenyRegCisla(:count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getZmenyRegistracniCislaPlatnostOd: {
            procName: "BEGIN cis_sukl_reg_cisla.GetZmenyRegCislaPlatnostOd(:platnost_od, :count, :cursor ); END;",
            procParams: {
                platnost_od: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        countZmenyRegistracniCislaPlatnostOd: {
            procName: "BEGIN cis_sukl_reg_cisla.CountZmenyRegCislaPlatnostOd(:platnost_od, :count); END;",
            procParams: {
                platnost_od: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT }
            }
        }
    };
    function FormatExceptionMessage(message) {
        return JSON.parse('{ "error" : "' + message.replace(/"/g, '\\\"').replace(/\n/g, '') + '"}');
    }
    common.FormatExceptionMessage = FormatExceptionMessage;
    ;
    function FormatException(e) {
        return JSON.parse('{ "status" : "' + e.status + '", "error" : "' + e.message + '"}');
    }
    common.FormatException = FormatException;
    ;
    //--------------------------------
    const fs = require('fs');
    const path = require('path');
    ///*
    //import { createLogger, format, transports } from 'winston';
    //winston
    //const { createLogger, format, transports, level } = require('winston');
    const env = process.env.NODE_ENV || 'development';
    const logDir = 'log';
    // Create the log directory if it does not exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    //const filename = path.join(logDir, 'results.log');
    //const { combine, timestamp, label, prettyPrint } = format;
    /*
    export class CutomLogger {
        static logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            ),        transports: [
                new transports.File({ filename }),
                new transports.Console()
            ]
        });
    }
    
    */
    /*

export const logger = createLogger({

    level: 'development' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSSS'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ), transports: [
        //new transports.File({ filename }),
        new transports.Console()
    ]
});
*/
})(common || (common = {}));
;
module.exports = common;
//# sourceMappingURL=common.js.map
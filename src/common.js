"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const oracledb_1 = require("oracledb");
let oracledb = require('oracledb');
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
    /*
        export const connectionAttributes: IConnectionAttributes = {
            user: "cis2016",
            password: "Amtax67779",
            connectString: "util"
        };
    /*/
    //*
    common.connectionAttributes = {
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
    ;
    class OraExecuteResult {
        constructor() { }
        ;
    }
    function ExecuteProcedure(oraProcedure) {
        return __awaiter(this, void 0, void 0, function* () {
            //oracledb.fetchAsString = [DATE, NUMBER];
            let oraExecuteResult = new OraExecuteResult();
            let connection = yield oracledb_1.getConnection(common.connectionAttributes);
            try {
                let result = yield connection.execute(oraProcedure.procName, oraProcedure.procParams, common.oraOutFormat);
                oraExecuteResult.count = result.outBinds.count;
                oraExecuteResult.totalCount = result.outBinds.total_count;
                if (oraExecuteResult.count <= 0) {
                    throw new AppError(404, 'Nenalezeny žádné záznamy.');
                }
                oraExecuteResult.resultSet = JSON.stringify(yield result.outBinds.cursor.getRows(result.outBinds.count), null, 4);
                return oraExecuteResult;
            }
            finally {
                connection.close();
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
            procName: "BEGIN cis_sukl_lp.GetSlozeniLecPripravkyKodSukl( :kod_sukl, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
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
        getLecivePripravkyKodSukl: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravkyKodSukl( :kod_sukl, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
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
})(common || (common = {}));
;
module.exports = common;
//# sourceMappingURL=common.js.map
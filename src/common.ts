"use strict";

import { IConnectionAttributes, IExecuteOptions, IConnection, getConnection, OBJECT, NUMBER, STRING, DATE, CURSOR, BIND_IN, BIND_OUT } from "oracledb";

let oracledb = require('oracledb');

namespace common {

    export class AppError implements Error {
        public name = 'AppError';
        public status: number; 
        public message: string; 
        constructor(status: number, message: string) {
            this.status = status;
            this.message = message;
        }
        toString() {
            return this.name + ': ' + this.message;
        }
        }
///*
    export const connectionAttributes: IConnectionAttributes = {
        user: "cis2016",
        password: "Amtax67779",
        connectString: "util"
    };
//*/
/*
    export const connectionAttributes: IConnectionAttributes = {
        user: "cis_sukl",
        password: "cis_sukl",
        connectString: "dlptest"
    };
*/

    export const oraOutFormat: IExecuteOptions = {
        outFormat: OBJECT
    };
    /*
    export const oraProcedures = {
        getCislaJednaciCisloJednaci:  "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cisloJednaci, :count, :cursor ); END;"

    };
    */

    export const defOffset: number = 0;
    export const defLimit: number = 20;

    export interface IOraProcedure {
        procName: string;
        procParams: Object;

    };

    export interface IOraExecuteResult {
        resultSet: string;
        totalCount: number;
        count: number;

    };

    class OraExecuteResult implements IOraExecuteResult {
        resultSet: string;
        totalCount: number;        
        count: number;
        constructor() { };
    }

    export async function ExecuteProcedure(oraProcedure: IOraProcedure): Promise<IOraExecuteResult> {

        //oracledb.fetchAsString = [DATE, NUMBER];

        let oraExecuteResult: IOraExecuteResult = new OraExecuteResult();

        let connection: IConnection = await getConnection(connectionAttributes);
        try {

            let result: any = await connection.execute(oraProcedure.procName, oraProcedure.procParams, oraOutFormat);

            oraExecuteResult.count = result.outBinds.count;
            oraExecuteResult.totalCount = result.outBinds.total_count;
            if (oraExecuteResult.count <= 0) {
                throw new AppError(404, 'Nenalezeny žádné záznamy.')
            }

            oraExecuteResult.resultSet = JSON.stringify(await result.outBinds.cursor.getRows(result.outBinds.count), null, 4);
            return oraExecuteResult;

        } finally {
            connection.close();
        }

    };


    export const oraProcs = {

        getScau: {
            procName: "BEGIN cis_sukl_scau.GetScau( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getScauKody: {
            procName: "BEGIN cis_sukl_scau.GetScauKody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getScauKodSukl: {
            procName: "BEGIN cis_sukl_scau.GetScauKodSukl( :kod_sukl, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getOrganizace: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizace( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getOrganizaceKody: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceKody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getOrganizaceKodOrganizace: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceKodOrganizace( :kod_organizace, :count, :cursor ); END;",
            procParams: {
                kod_organizace: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getOrganizaceJeDrzitel: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceJeDrzitel( :je_drzitel, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_drzitel: { val: '', type: STRING, dir: BIND_IN },
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },


        getOrganizaceKodyJeDrzitel: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceKodyJeDrzitel( :je_drzitel, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_drzitel: { val: '', type: STRING, dir: BIND_IN },
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getOrganizaceJeVyrobce: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceJeVyrobce( :je_vyrobce, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_vyrobce: { val: '', type: STRING, dir: BIND_IN },
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },


        getOrganizaceKodyJeVyrobce: {
            procName: "BEGIN cis_sukl_organizace.GetOrganizaceKodyJeVyrobce( :je_vyrobce, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_vyrobce: { val: '', type: STRING, dir: BIND_IN },
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },


        getUcinneLatky: {
            procName: "BEGIN cis_sukl_cis.GetUcinneLatky( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getUcinneLatkyKody: {
            procName: "BEGIN cis_sukl_cis.GetUcinneLatkyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getUcinneLatkyKodUcinnaLatka: {
            procName: "BEGIN cis_sukl_cis.GetUcinneLatkyKodUcinnaLatka( :kod_ucinna_latka, :count, :cursor ); END;",
            procParams: {
                kod_ucinna_latka: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getUcinneLatkyKodSukl: {
            procName: "BEGIN cis_sukl_cis.GetUcinneLatkyKodSukl( :kod_sukl, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },



        getAtcSkupiny: {
            procName: "BEGIN cis_sukl_cis.GetAtcSkupiny( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getAtcSkupinyKody: {
            procName: "BEGIN cis_sukl_cis.GetAtcSkupinyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getAtcSkupinyKodAtcSkupina: {
            procName: "BEGIN cis_sukl_cis.GetAtcSkupinyKodAtcSkupina( :kod_atc_skupina, :count, :cursor ); END;",
            procParams: {
                kod_atc_skupina: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getIndikacniSkupiny: {
            procName: "BEGIN cis_sukl_cis.GetIndikacniSkupiny( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getIndikacniSkupinyKody: {
            procName: "BEGIN cis_sukl_cis.GetIndikacniSkupinyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getIndikacniSkupinyKodIndikacniSkupina: {
            procName: "BEGIN cis_sukl_cis.GetIndikacniSkupinyKodIndSkup( :kod_indikacni_skupina, :count, :cursor ); END;",
            procParams: {
                kod_indikacni_skupina: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getStavyRegistrace: {
            procName: "BEGIN cis_sukl_cis.GetStavyRegistrace( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getStavyRegistraceKody: {
            procName: "BEGIN cis_sukl_cis.GetStavyRegistraceKody( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getStavyRegistraceKodStavRegistrace: {
            procName: "BEGIN cis_sukl_cis.GetStavyRegistraceKodStavReg( :kod_stav_registrace, :count, :cursor ); END;",
            procParams: {
                kod_stav_registrace: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },




        getDis13Kody: {
            procName: "BEGIN cis_sukl_dis13.GetDis13Kody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getLecivePripravkyKodyKodDrzitele: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyKodyKodDrzitele( :je_regulovany, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                kod_drzitele: { val: '', type: STRING, dir: BIND_IN },
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getLecivePripravkyKodyJeRegulovany: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyKodyJeRegul( :je_regulovany, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                je_regulovany: { val: '', type: STRING, dir: BIND_IN },
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getLecivePripravkyKody: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravkyKody( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getLecivePripravky: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravky( :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }
            }
        },


        getLecivePripravkyKodyPlatnostOd: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyKodyPlatnostOd( :platnost_od, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                platnost_od: { val: '', type: STRING, dir: BIND_IN },
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }
            }
        },
        getLecivePripravkyPlatnostOd: {
            procName: "BEGIN cis_sukl_lp.GetLecPripravkyPlatnostOd( :platnost_od, :offset, :limit, :total_count, :count, :cursor ); END;",
            procParams: {
                platnost_od: { val: '', type: STRING, dir: BIND_IN },
                offset: { val: 0, type: NUMBER, dir: BIND_IN },
                limit: { val: 5, type: NUMBER, dir: BIND_IN },
                total_count: { type: NUMBER, dir: BIND_OUT },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }
            }
        },


        getLecivePripravkyKodSukl: {
            procName: "BEGIN cis_sukl_lp.GetLecivePripravkyKodSukl( :kod_sukl, :count, :cursor ); END;",
            procParams: {
                kod_sukl: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },

        getNeregistrovaneLecivePripravky: {
            procName: "BEGIN cis_sukl_lp.GetNeregLecPripravky( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getNeregistrovaneLecivePripravkyObdobiOd: {
            procName: "BEGIN cis_sukl_lp.GetNeregLecPripravkyObdobiOd( :obdobi_od, :count, :cursor ); END;",
            procParams: {
                obdobi_od: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getLekarny: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarny( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getLekarnyKody: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarnyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getLekarnyStatus: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarnyStatus( :status, :count, :cursor ); END;",
            procParams: {
                status: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getLekarnyKodyStatus: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarnyKodyStatus( :status, :count, :cursor ); END;",
            procParams: {
                status: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getLekarnyKodPracoviste: {
            procName: "BEGIN cis_sukl_lekarny.GetLekarnyKodPracoviste( :kod_pracoviste, :count, :cursor ); END;",
            procParams: {
                kod_pracoviste: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getCislaJednaciCisloJednaci: {
            procName : "BEGIN cis_sukl_reg_cisla.GetCislaJednaciCisJednaci( :cislo_jednaci, :count, :cursor ); END;",
            procParams : {
                cislo_jednaci: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }
            
            }
        },
        getCislaJednaciMrpCislo: {
            procName: "BEGIN cis_sukl_reg_cisla.GetCislaJednaciMrpCislo( :mrp_cislo, :count, :cursor ); END;",
            procParams: {
                mrp_cislo: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getZmenyRegistracniCisla: {
            procName: "BEGIN cis_sukl_reg_cisla.GetZmenyRegCisla(:count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getZmenyRegistracniCislaPlatnostOd: {
            procName: "BEGIN cis_sukl_reg_cisla.GetZmenyRegCislaPlatnostOd(:platnost_od, :count, :cursor ); END;",
            procParams: {
                
                platnost_od: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }
                

            }
        },
        countZmenyRegistracniCislaPlatnostOd: {
            procName: "BEGIN cis_sukl_reg_cisla.CountZmenyRegCislaPlatnostOd(:platnost_od, :count); END;",
            procParams: {
                platnost_od: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT }
            }
        }

    };

    export function FormatExceptionMessage(message: string): string {
        return JSON.parse('{ "error" : "' +  message.replace(/"/g, '\\\"').replace(/\n/g, '')  + '"}');
    };


    export function FormatException(e: AppError): string  {
        return JSON.parse('{ "status" : "' + e.status + '", "error" : "' + e.message + '"}');
    };
};

export = common;
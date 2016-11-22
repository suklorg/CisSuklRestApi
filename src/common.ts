"use strict";

import { IConnectionAttributes, IExecuteOptions, IConnection, getConnection, OBJECT, NUMBER, STRING, DATE, CURSOR, BIND_IN, BIND_OUT } from "oracledb";

'use strict';
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

    export const connectionAttributes: IConnectionAttributes = {
        user: "cis_sukl",
        password: "cis_sukl",
        connectString: "dlptest"
    };
    export const oraOutFormat: IExecuteOptions = {
        outFormat: OBJECT
    };

    export const oraProcedures = {
        getCislaJednaciCisloJednaci:  "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cisloJednaci, :count, :cursor ); END;"

    };

    export interface IOraProcedure {
        procName: string;
        procParams: Object;

    };

    export interface IOraExecuteResult {
        resultSet: string;
        count: number;

    };

    class OraExecuteResult implements IOraExecuteResult {
        resultSet: string;
        count: number;
        constructor() { };
    }

    export async function ExecuteProcedure(oraProcedure: IOraProcedure): Promise<IOraExecuteResult> {

        let oraExecuteResult: IOraExecuteResult = new OraExecuteResult();

        let connection: IConnection = await getConnection(connectionAttributes);
        try {

            let result: any = await connection.execute(oraProcedure.procName, oraProcedure.procParams, oraOutFormat);

            oraExecuteResult.count = result.outBinds.count;
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
        getCislaJednaciCisloJednaci: {
            procName : "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cislo_jednaci, :count, :cursor ); END;",
            procParams : {
                cislo_jednaci: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }
            
            }
        },
        getCislaJednaciMrpCislo: {
            procName: "BEGIN cis_sukl_dlp.GetCislaJednaciMrpCislo( :mrp_cislo, :count, :cursor ); END;",
            procParams: {
                mrp_cislo: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getZmenyRegistracniCisla: {
            procName: "BEGIN cis_sukl_dlp.GetZmenyRegCisla(:count, :cursor ); END;",
            procParams: {
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }

            }
        },
        getZmenyRegistracniCislaPlatnostOd: {
            procName: "BEGIN cis_sukl_dlp.GetZmenyRegCislaPlatnostOd(:platnost_od, :count, :cursor ); END;",
            procParams: {
                
                platnost_od: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }
                

            }
        },
        countZmenyRegistracniCislaPlatnostOd: {
            procName: "BEGIN cis_sukl_dlp.CountZmenyRegCislaPlatnostOd(:platnost_od, :count); END;",
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
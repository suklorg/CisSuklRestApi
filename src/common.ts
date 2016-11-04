import { IConnectionAttributes, IExecuteOptions, OBJECT, NUMBER, STRING, CURSOR, BIND_IN, BIND_OUT } from "oracledb";

'use strict';
namespace common {

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


    export const oraProcs = {
        getCislaJednaciCisloJednaci: {
            procName : "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cisloJednaci, :count, :cursor ); END;",
            procParams : {
                cisloJednaci: { val: '', type: STRING, dir: BIND_IN },
                count: { type: NUMBER, dir: BIND_OUT },
                cursor: { type: CURSOR, dir: BIND_OUT }
            
            }
        }

    };

    export function FormatExceptionMessage(message: string): string
    {
        return JSON.parse('{ "error" : "' +  message.replace(/"/g, '\\\"').replace(/\n/g, '')  + '"}');
    };
};

export = common;
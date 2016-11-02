import { IConnectionAttributes, IExecuteOptions, OBJECT } from "oracledb";

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
        getCislaJednaciCisloJednaci: "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cisloJednaci, :count, :cursor ); END;"

    };

    export function FormatExceptionMessage(message: string): string
    {
        return JSON.parse('{ "error" : "' +  message.replace(/"/g, '\\\"').replace(/\n/g, '')  + '"}');
    };
};

export = common;
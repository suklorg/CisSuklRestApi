"use strict";
const oracledb_1 = require("oracledb");
'use strict';
var common;
(function (common) {
    common.connectionAttributes = {
        user: "cis_sukl",
        password: "cis_sukl",
        connectString: "dlptest"
    };
    common.oraOutFormat = {
        outFormat: oracledb_1.OBJECT
    };
    common.oraProcedures = {
        getCislaJednaciCisloJednaci: "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cisloJednaci, :count, :cursor ); END;"
    };
    common.oraProcs = {
        getCislaJednaciCisloJednaci: {
            procName: "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cisloJednaci, :count, :cursor ); END;",
            procParams: {
                cisloJednaci: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        }
    };
    function FormatExceptionMessage(message) {
        return JSON.parse('{ "error" : "' + message.replace(/"/g, '\\\"').replace(/\n/g, '') + '"}');
    }
    common.FormatExceptionMessage = FormatExceptionMessage;
    ;
})(common || (common = {}));
;
module.exports = common;
//# sourceMappingURL=common.js.map
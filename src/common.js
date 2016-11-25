"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const oracledb_1 = require("oracledb");
'use strict';
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
    ;
    ;
    class OraExecuteResult {
        constructor() {
        }
        ;
    }
    function ExecuteProcedure(oraProcedure) {
        return __awaiter(this, void 0, void 0, function* () {
            let oraExecuteResult = new OraExecuteResult();
            let connection = yield oracledb_1.getConnection(common.connectionAttributes);
            try {
                let result = yield connection.execute(oraProcedure.procName, oraProcedure.procParams, common.oraOutFormat);
                oraExecuteResult.count = result.outBinds.count;
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
    common.oraProcs = {
        getLekarny: {
            procName: "BEGIN cis_sukl_dlp.GetLekarny( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarnyKody: {
            procName: "BEGIN cis_sukl_dlp.GetLekarnyKody( :count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarnyStatus: {
            procName: "BEGIN cis_sukl_dlp.GetLekarnyStatus( :status, :count, :cursor ); END;",
            procParams: {
                status: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarnyKodyStatus: {
            procName: "BEGIN cis_sukl_dlp.GetLekarnyKodyStatus( :status, :count, :cursor ); END;",
            procParams: {
                status: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getLekarnyKodPracoviste: {
            procName: "BEGIN cis_sukl_dlp.GetLekarnyKodPracoviste( :kod_pracoviste, :count, :cursor ); END;",
            procParams: {
                kod_pracoviste: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCislaJednaciCisloJednaci: {
            procName: "BEGIN cis_sukl_dlp.GetCislaJednaciCisJednaci( :cislo_jednaci, :count, :cursor ); END;",
            procParams: {
                cislo_jednaci: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getCislaJednaciMrpCislo: {
            procName: "BEGIN cis_sukl_dlp.GetCislaJednaciMrpCislo( :mrp_cislo, :count, :cursor ); END;",
            procParams: {
                mrp_cislo: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getZmenyRegistracniCisla: {
            procName: "BEGIN cis_sukl_dlp.GetZmenyRegCisla(:count, :cursor ); END;",
            procParams: {
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        getZmenyRegistracniCislaPlatnostOd: {
            procName: "BEGIN cis_sukl_dlp.GetZmenyRegCislaPlatnostOd(:platnost_od, :count, :cursor ); END;",
            procParams: {
                platnost_od: { val: '', type: oracledb_1.STRING, dir: oracledb_1.BIND_IN },
                count: { type: oracledb_1.NUMBER, dir: oracledb_1.BIND_OUT },
                cursor: { type: oracledb_1.CURSOR, dir: oracledb_1.BIND_OUT }
            }
        },
        countZmenyRegistracniCislaPlatnostOd: {
            procName: "BEGIN cis_sukl_dlp.CountZmenyRegCislaPlatnostOd(:platnost_od, :count); END;",
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
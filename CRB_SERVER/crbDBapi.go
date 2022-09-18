package main

import (
	"database/sql"
	"fmt"
)

const DBCredentials = "CRB_ORDER_MASTER_DEV/CRBsion1@ORCL"

var dbHandler *sql.DB
var dbConnected bool = false

func getDBHandler() {
	var err error
	if !dbConnected {
		dbHandler, err = sql.Open("godror", DBCredentials)
		if err != nil {
			ErrorLog.Println(fmt.Sprintf(" Error while connecting to DB [%s], Trace: [%s]", DBCredentials, err))
		}
		dbConnected = true
		//defer dbHandler.Close()
	}
}
func logError(errMsg string, err interface{}) {
	if err != nil {
		ErrorLog.Println(fmt.Sprintf("[ %s ], Trace: %s", errMsg, err))
	}
}

// ExecuteReader execute the specified select SQL statement and return the result as sql.rows
func ExecuteReader(sqlStmt string) *sql.Rows {
	getDBHandler()

	rows, err := dbHandler.Query(sqlStmt)
	if err != nil {
		logError("error while running the query check Oracle DB  ", err)

	}
	return rows
}

// ExecuteSQL execute the specified insert / update/delete SQL statement and return the result as sql.result
func ExecuteSQL(sqlStmt string) sql.Result {
	getDBHandler()
	fmt.Println(sqlStmt)
	rslt, err := dbHandler.Exec(sqlStmt)
	if err != nil {
		fmt.Println(fmt.Sprintf(" Error while executing SQL [ %s ] ", err))
		logError("error while executing the prepared statement check Oracle DB  ", err)
	}
	return rslt
}

package main

import (
	"fmt"
)

var tableMap = map[string][]string{
	"USER":     {USER_DATA_SQL},
	"ORDER":    {ORDER_DATA_SQL},
	"ORDERDTL": {ORDER_DETAIL_DATA_SQL},
	"EMPHIER":  {EMP_HIREARCHY},
}

func GetMasterDataJSON(paramId int, startId int, endId int, reqType string) string {
	if reqType == "USER" {
		return GetDataFromDBBySQL(fmt.Sprintf(tableMap[reqType][0], startId, endId))
	} else {
		if reqType == "ORDER" {
			return GetDataFromDBBySQL(fmt.Sprintf(tableMap[reqType][0], paramId, startId, endId))
		} else {
			return GetDataFromDBBySQL(fmt.Sprintf(tableMap[reqType][0], paramId))
		}
	}

}
func GetEmpHirearchyJSON() string {
	return GetTreeStructureJSON(tableMap["EMPHIER"][0])
}

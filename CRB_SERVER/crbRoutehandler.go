package main

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"

	// gorder required for oracle
	_ "github.com/godror/godror"
)

func GetEmpHierarchyData() gin.HandlerFunc {
	fn := func(cxt *gin.Context) {
		fmt.Println(fmt.Sprintf(" Get handler invoked in  Employee hierarchy data for FROM ANGULAR CLIENT successfully ..... "))
		jsonData := GetEmpHirearchyJSON()
		//fmt.Println(jsonData)
		cxt.JSON(200, jsonData)
	}
	return gin.HandlerFunc(fn)
}

// GetMasterData is generic implementaion get data for all config table types to reduce the code foot print and it is exported.
func GetMasterData(reqType string) gin.HandlerFunc {
	fn := func(cxt *gin.Context) {
		//enc := json.NewEncoder(os.Stdout)
		paramId, _ := strconv.Atoi(cxt.Request.URL.Query().Get("paramid"))
		startId, _ := strconv.Atoi(cxt.Request.URL.Query().Get("startid"))
		endId, _ := strconv.Atoi(cxt.Request.URL.Query().Get("endid"))
		fmt.Println(fmt.Sprintf(" Get handler invoked in  crb master data FROM ANGULAR CLIENT successfully start/end ids is [%d] .. , [%d] , [%d].... ", paramId, startId, endId))
		jsonData := GetMasterDataJSON(paramId, startId, endId, reqType)
		fmt.Println(jsonData)
		cxt.JSON(200, jsonData)
	}
	return gin.HandlerFunc(fn)
}

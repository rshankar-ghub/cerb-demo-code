package main

import (
	"fmt"
	"log"
	"os"
)

// InfoLog logging all common details like info, debug
var InfoLog *log.Logger

// ErrorLog record all errors , fatel errors , application errors
var ErrorLog *log.Logger

// InitializeLogWriter : initialization of logging mechanism and called from main entry point
func InitializeLogWriter() {
	openLogfile, err := os.OpenFile("c:/temp"+"/log.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("Error opening Log file:", err)
		os.Exit(1)
	}
	InfoLog = log.New(openLogfile, "[INFO]:\t", log.Ldate|log.Ltime|log.Lshortfile)
	ErrorLog = log.New(openLogfile, "[ERROR]:\t", log.Ldate|log.Ltime|log.Lshortfile)
}

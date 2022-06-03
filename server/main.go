package main

import (
	"chemi/pkg/setting"
	"chemi/routers"
	"chemi/services"
	"fmt"
	"log"
	"net/http"
)

func init() {
	setting.Setup()
	services.Setup()
}

func main() {
	initRouter := routers.InitRouter()
	readTimeout := setting.ServerSetting.ReadTimeout
	writeTimeout := setting.ServerSetting.WriteTimeout
	endPoint := fmt.Sprintf(":%d", setting.ServerSetting.HttpPort)
	maxHeaderBytes := 1 << 20
	server := &http.Server{
		Addr:           endPoint,
		Handler:        initRouter,
		ReadTimeout:    readTimeout,
		WriteTimeout:   writeTimeout,
		MaxHeaderBytes: maxHeaderBytes,
	}

	log.Printf("[info] start http server listening %s", endPoint)

	err := server.ListenAndServe()
	if err != nil {
		log.Printf("start http server faild %s", err)
	}
}

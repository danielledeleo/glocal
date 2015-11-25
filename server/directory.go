package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"io"
	"net/http"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", func(rw http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(rw, "what's up? you just hit the server\n")
	})

	api := router.PathPrefix("/api/v1").Subrouter()

	api.HandleFunc("/text", APIHandler)

	fmt.Println("Starting server on :19000")
	http.ListenAndServe(":19000", router)

}

func APIHandler(rw http.ResponseWriter, req *http.Request) {
	fmt.Println(req.URL.String(), req.RemoteAddr)

	io.WriteString(rw, "sup\n")
}

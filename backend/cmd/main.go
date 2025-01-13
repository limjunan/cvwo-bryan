package main

import (
    "fmt"
	"net/http"
    "cvwo-bryan/backend/pkg/db"
)

func main() {
    db.Init()

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    })

    fmt.Println("Server is running on port 8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Println("Failed to start server:", err)
 
	}
}
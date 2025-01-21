package main

import (
    "log"
    "net/http"

    "cvwo-bryan/backend/pkg/db"
)

func main() {
    // Initialize the database
    db.Init()

    // Initialize the routes
    router := db.InitializeRoutes()

    // Start the server
    log.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", router))
}
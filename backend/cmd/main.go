package main

import (
    "log"
    "net/http"
    // "github.com/gorilla/mux"
    "github.com/rs/cors"
    "cvwo-bryan/backend/pkg/db"
)

func main() {
    // Initialize the database
    db.Init()

    // Initialize the routes
    router := db.InitializeRoutes()

    // Enable CORS
    c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"},
        AllowCredentials: true,
        AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders: []string{"Content-Type", "Authorization"},
    })

    // Start the server
    log.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", c.Handler(router)))
}
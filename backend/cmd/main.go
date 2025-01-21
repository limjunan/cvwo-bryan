package main

import (
    "flag"
    "log"
    "net/http"
    "github.com/rs/cors"
    "cvwo-bryan/backend/pkg/db"
)

func main() {
    // Command-line flags to seed or unseed the database
    seed := flag.Bool("seed", false, "Seed the database")
    unseed := flag.Bool("unseed", false, "Unseed the database")
    flag.Parse()

    // Initialize the database
    db.Init()

    // Run migrations
    err := db.DB.AutoMigrate(&db.User{}, &db.Thread{}, &db.Comment{}, &db.Tag{})
    if err != nil {
        log.Fatal("Failed to run migrations:", err)
    }

    if *seed {
        // Seed the database
        db.Seed(db.DB)
    } else if *unseed {
        // Unseed the database
        db.Unseed(db.DB)
    }

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
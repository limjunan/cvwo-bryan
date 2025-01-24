package db

import (
    "github.com/gorilla/mux"
)

func InitializeRoutes() *mux.Router {
    router := mux.NewRouter()

    // User routes
    router.HandleFunc("/register", RegisterUser).Methods("POST")
    router.HandleFunc("/login", LoginUser).Methods("POST")

    // Thread routes
    router.HandleFunc("/threads", GetThreads).Methods("GET")
    router.HandleFunc("/threads/{id}", GetThread).Methods("GET")
    router.HandleFunc("/threads", CreateThread).Methods("POST")
    router.HandleFunc("/threads/{id}", UpdateThread).Methods("PUT")
    router.HandleFunc("/threads/{id}", DeleteThread).Methods("DELETE")

    // Comment routes
    router.HandleFunc("/threads/{id}/comments", GetComments).Methods("GET")
    router.HandleFunc("/threads/{id}/comments/{commentId}", GetComment).Methods("GET")
    router.HandleFunc("/threads/{id}/comments", CreateComment).Methods("POST")
    router.HandleFunc("/threads/{id}/comments/{commentId}", UpdateComment).Methods("PUT")
    router.HandleFunc("/threads/{id}/comments/{commentId}", DeleteComment).Methods("DELETE")

    // Tag routes
    router.HandleFunc("/tags", GetTags).Methods("GET")
    router.HandleFunc("/tags/{id}", GetTag).Methods("GET")
    router.HandleFunc("/tags", CreateTag).Methods("POST")
    router.HandleFunc("/tags/{id}", UpdateTag).Methods("PUT")
    router.HandleFunc("/tags/{id}", DeleteTag).Methods("DELETE")

    return router
}
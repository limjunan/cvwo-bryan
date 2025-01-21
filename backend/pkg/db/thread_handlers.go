package db

import (
    "encoding/json"
    "net/http"
    "strconv"

    "github.com/gorilla/mux"
)

func GetThreads(w http.ResponseWriter, r *http.Request) {
    var threads []Thread
    db.Preload("User").Preload("Tag").Preload("Comments").Find(&threads)
    json.NewEncoder(w).Encode(threads)
}

func GetThread(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var thread Thread
    db.Preload("User").Preload("Tag").Preload("Comments").First(&thread, id)
    json.NewEncoder(w).Encode(thread)
}

func CreateThread(w http.ResponseWriter, r *http.Request) {
    var thread Thread
    json.NewDecoder(r.Body).Decode(&thread)
    db.Create(&thread)
    json.NewEncoder(w).Encode(thread)
}

func UpdateThread(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var thread Thread
    db.First(&thread, id)
    json.NewDecoder(r.Body).Decode(&thread)
    db.Save(&thread)
    json.NewEncoder(w).Encode(thread)
}

func DeleteThread(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var thread Thread
    db.Delete(&thread, id)
    json.NewEncoder(w).Encode("Thread deleted successfully")
}
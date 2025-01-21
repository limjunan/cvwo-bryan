package db

import (
    "encoding/json"
    "net/http"
    "strconv"

    "github.com/gorilla/mux"
)

func GetTags(w http.ResponseWriter, r *http.Request) {
    var tags []Tag
    db.Find(&tags)
    json.NewEncoder(w).Encode(tags)
}

func GetTag(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var tag Tag
    db.First(&tag, id)
    json.NewEncoder(w).Encode(tag)
}

func CreateTag(w http.ResponseWriter, r *http.Request) {
    var tag Tag
    json.NewDecoder(r.Body).Decode(&tag)
    db.Create(&tag)
    json.NewEncoder(w).Encode(tag)
}

func UpdateTag(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var tag Tag
    db.First(&tag, id)
    json.NewDecoder(r.Body).Decode(&tag)
    db.Save(&tag)
    json.NewEncoder(w).Encode(tag)
}

func DeleteTag(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var tag Tag
    db.Delete(&tag, id)
    json.NewEncoder(w).Encode("Tag deleted")
}
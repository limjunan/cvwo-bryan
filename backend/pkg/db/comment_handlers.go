package db

import (
    "encoding/json"
    "net/http"
    "strconv"

    "github.com/gorilla/mux"
)

func GetComments(w http.ResponseWriter, r *http.Request) {
    var comments []Comment
    db.Find(&comments)
    json.NewEncoder(w).Encode(comments)
}

func GetComment(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var comment Comment
    db.First(&comment, id)
    json.NewEncoder(w).Encode(comment)
}

func CreateComment(w http.ResponseWriter, r *http.Request) {
    var comment Comment
    json.NewDecoder(r.Body).Decode(&comment)
    db.Create(&comment)
    json.NewEncoder(w).Encode(comment)
}

func UpdateComment(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var comment Comment
    db.First(&comment, id)
    json.NewDecoder(r.Body).Decode(&comment)
    db.Save(&comment)
    json.NewEncoder(w).Encode(comment)
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var comment Comment
    db.Delete(&comment, id)
    json.NewEncoder(w).Encode("Comment deleted")
}
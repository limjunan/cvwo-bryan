package db

import (
    "encoding/json"
    "net/http"
    "strconv"

    "github.com/gorilla/mux"
    "gorm.io/gorm"
)

var db *gorm.DB

func SetDB(database *gorm.DB) {
    db = database
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
    var users []User
    db.Find(&users)
    json.NewEncoder(w).Encode(users)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var user User
    db.First(&user, id)
    json.NewEncoder(w).Encode(user)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
    var user User
    json.NewDecoder(r.Body).Decode(&user)
    db.Create(&user)
    json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var user User
    db.First(&user, id)
    json.NewDecoder(r.Body).Decode(&user)
    db.Save(&user)
    json.NewEncoder(w).Encode(user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var user User
    db.Delete(&user, id)
    json.NewEncoder(w).Encode("User deleted")
}
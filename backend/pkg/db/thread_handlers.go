package db

import (
    "encoding/json"
    "net/http"
    "strconv"

    "github.com/gorilla/mux"
)

func GetThreads(w http.ResponseWriter, r *http.Request) {
    var threads []Thread
    db.Preload("User").Preload("Tags").Preload("Comments").Order("created_at desc").Find(&threads)
    json.NewEncoder(w).Encode(threads)
}

func GetThread(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var thread Thread
    db.Preload("User").Preload("Tags").Preload("Comments").First(&thread, id)
    json.NewEncoder(w).Encode(thread)
}

type CreateThreadInput struct {
    Title    string `json:"title"`
    Content  string `json:"content"`
    Username string `json:"username"`
    Tags     []int  `json:"tags"` // Change to []int to accept array of numbers
}

func CreateThread(w http.ResponseWriter, r *http.Request) {
    var input CreateThreadInput
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    var user User
    if err := db.Where("username = ?", input.Username).First(&user).Error; err != nil {
        http.Error(w, "User not found", http.StatusBadRequest)
        return
    }

    var tags []Tag
    if err := db.Where("id IN ?", input.Tags).Find(&tags).Error; err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    thread := Thread{
        Title:   input.Title,
        Content: input.Content,
        UserID:  user.ID,
        Tags:    tags,
    }

    if err := db.Create(&thread).Error; err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

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
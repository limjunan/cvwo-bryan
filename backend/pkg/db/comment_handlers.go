package db

import (
    "encoding/json"
    "net/http"
    "strconv"
    "gorm.io/gorm"
    "github.com/gorilla/mux"
)

type CreateCommentInput struct {
    Content  string `json:"content"`
    Username string `json:"username"`
}

func GetComments(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    threadID, _ := strconv.Atoi(params["id"])
    var comments []Comment
    db.Preload("User").Where("thread_id = ?", threadID).Find(&comments)
    json.NewEncoder(w).Encode(comments)
}

func GetComment(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var comment Comment
    db.Preload("User").First(&comment, id)
    json.NewEncoder(w).Encode(comment)
}

func CreateComment(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    threadID, _ := strconv.Atoi(params["id"])

    var input CreateCommentInput
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    var user User
    if err := db.Where("username = ?", input.Username).First(&user).Error; err != nil {
        http.Error(w, "User not found", http.StatusBadRequest)
        return
    }

    comment := Comment{
        Content:  input.Content,
        UserID:   user.ID,
        ThreadID: uint(threadID),
    }

    if err := db.Create(&comment).Error; err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    db.Preload("User").First(&comment, comment.ID)
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
    threadID, err := strconv.Atoi(params["id"])
    if err != nil {
        http.Error(w, "Invalid thread ID", http.StatusBadRequest)
        return
    }
    commentID, err := strconv.Atoi(params["commentId"])
    if err != nil {
        http.Error(w, "Invalid comment ID", http.StatusBadRequest)
        return
    }

    var comment Comment
    if err := db.Where("thread_id = ? AND id = ?", threadID, commentID).First(&comment).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            http.Error(w, "Comment not found", http.StatusNotFound)
        } else {
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
        return
    }

    if err := db.Delete(&comment).Error; err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode("Comment deleted successfully")
}
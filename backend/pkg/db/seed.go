package db

import (
    "log"
)

func Seed() {
    // Check if there are any users in the database
    var userCount int64
    DB.Model(&User{}).Count(&userCount)
    if userCount > 0 {
        log.Println("Database already seeded")
        return
    }

    // Create initial users
    users := []User{
        {Username: "user1"},
        {Username: "user2"},
    }
    for _, user := range users {
        if err := DB.Create(&user).Error; err != nil {
            log.Printf("Failed to create user %s: %v", user.Username, err)
        }
    }

    // Create initial tags
    tags := []Tag{
        {Name: "tag1"},
        {Name: "tag2"},
    }
    for _, tag := range tags {
        if err := DB.Create(&tag).Error; err != nil {
            log.Printf("Failed to create tag %s: %v", tag.Name, err)
        }
    }

    // Create initial threads
    threads := []Thread{
        {Title: "Thread 1", Content: "Content for thread 1", UserID: 1, TagID: 1},
        {Title: "Thread 2", Content: "Content for thread 2", UserID: 2, TagID: 2},
    }
    for _, thread := range threads {
        if err := DB.Create(&thread).Error; err != nil {
            log.Printf("Failed to create thread %s: %v", thread.Title, err)
        }
    }

    // Create initial comments
    comments := []Comment{
        {Content: "Comment 1", UserID: 1, ThreadID: 1},
        {Content: "Comment 2", UserID: 2, ThreadID: 2},
    }
    for _, comment := range comments {
        if err := DB.Create(&comment).Error; err != nil {
            log.Printf("Failed to create comment: %v", err)
        }
    }

    log.Println("Database seeded successfully")
}
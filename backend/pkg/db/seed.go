package db

import (
    "log"
    "gorm.io/gorm"
)

func Seed(DB *gorm.DB) {
    // Create initial users
    users := []User{
        {Username: "user1"},
        {Username: "user2"},
    }
    for _, user := range users {
        if err := DB.Create(&user).Error; err != nil {
            log.Printf("Failed to create user: %v", err)
        }
    }

    // Create initial tags
    tags := []Tag{
        {Name: "Tag1"},
        {Name: "Tag2"},
    }
    for _, tag := range tags {
        if err := DB.Create(&tag).Error; err != nil {
            log.Printf("Failed to create tag: %v", err)
        }
    }

    // Fetch the created users and tags to get their IDs
    var user1, user2 User
    var tag1, tag2 Tag
    DB.Where("username = ?", "user1").First(&user1)
    DB.Where("username = ?", "user2").First(&user2)
    DB.Where("name = ?", "Tag1").First(&tag1)
    DB.Where("name = ?", "Tag2").First(&tag2)

    // Create initial threads
    threads := []Thread{
        {Title: "Thread 1", Content: "Content for thread 1", UserID: user1.ID, TagID: tag1.ID},
        {Title: "Thread 2", Content: "Content for thread 2", UserID: user2.ID, TagID: tag2.ID},
    }
    for _, thread := range threads {
        if err := DB.Create(&thread).Error; err != nil {
            log.Printf("Failed to create thread: %v", err)
        }
    }

    // Fetch the created threads to get their IDs
    var thread1, thread2 Thread
    DB.Where("title = ?", "Thread 1").First(&thread1)
    DB.Where("title = ?", "Thread 2").First(&thread2)

    // Create initial comments
    comments := []Comment{
        {Content: "Comment 1", UserID: user1.ID, ThreadID: thread1.ID},
        {Content: "Comment 2", UserID: user2.ID, ThreadID: thread2.ID},
    }
    for _, comment := range comments {
        if err := DB.Create(&comment).Error; err != nil {
            log.Printf("Failed to create comment: %v", err)
        }
    }

    log.Println("Database seeded successfully")
}

func Unseed(DB *gorm.DB) {
    // Delete all records from the tables in the correct order
    if err := DB.Exec("DELETE FROM comments").Error; err != nil {
        log.Printf("Failed to delete comments: %v", err)
    }
    if err := DB.Exec("DELETE FROM threads").Error; err != nil {
        log.Printf("Failed to delete threads: %v", err)
    }
    if err := DB.Exec("DELETE FROM tags").Error; err != nil {
        log.Printf("Failed to delete tags: %v", err)
    }
    if err := DB.Exec("DELETE FROM users").Error; err != nil {
        log.Printf("Failed to delete users: %v", err)
    }

    log.Println("Database unseeded successfully")
}
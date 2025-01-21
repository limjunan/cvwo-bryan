package db

import (
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Username string `gorm:"unique"`
    Threads  []Thread
    Comments []Comment
}

type Thread struct {
    gorm.Model
    Title    string
    Content  string
    UserID   uint
    User     User
    Tags     []Tag `gorm:"many2many:thread_tags;"`
    Comments []Comment
}

type Comment struct {
    gorm.Model
    Content  string
    UserID   uint
    User     User
    ThreadID uint
    Thread   Thread
}

type Tag struct {
    gorm.Model
    Name    string `gorm:"unique"`
    Threads []Thread `gorm:"many2many:thread_tags;"`
}
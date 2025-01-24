package db

import (
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Username string
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
    Comments []Comment `gorm:"constraint:OnDelete:CASCADE;"`
}

type Comment struct {
    gorm.Model
    Content  string
    UserID   uint
    User     User
    ThreadID uint
}

type Tag struct {
    gorm.Model
    Name    string
    Color   string
    Threads []Thread `gorm:"many2many:thread_tags;"`
}
package db

import (
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Username string `gorm:"unique"`
}

type Thread struct {
    gorm.Model
    Title   string
    Content string
    UserID  uint
    TagID   uint
}

type Comment struct {
    gorm.Model
    Content  string
    UserID   uint
    ThreadID uint
}

type Tag struct {
    gorm.Model
    Name string `gorm:"unique"`
}
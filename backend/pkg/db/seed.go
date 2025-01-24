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
        {Name: "Computing", Color: "#FFB3BA"}, // Pastel Red
        {Name: "BZA", Color: "#BFFCC6"}, // Pastel Green
        {Name: "CS", Color: "#B3E5FC"}, // Pastel Blue
        {Name: "General", Color: "#FFDFBA"}, // Pastel Orange
        {Name: "IS", Color: "#FFFFBA"}, // Pastel Yellow
        {Name: "CEG", Color: "#FFB3BA"}, // Pastel Red
        {Name: "CS2030S", Color: "#BFFCC6"}, // Pastel Green
        {Name: "CS2100", Color: "#B3E5FC"}, // Pastel Blue
        {Name: "CS2040S", Color: "#FFDFBA"}, // Pastel Orange
        {Name: "CS1101S", Color: "#FFFFBA"}, // Pastel Yellow
    }
    for _, tag := range tags {
        if err := DB.Create(&tag).Error; err != nil {
            log.Printf("Failed to create tag: %v", err)
        }
    }

    // Fetch the created users and tags to get their IDs
    var user1, user2 User
    var tag1, tag2, tag3, tag4, tag5 Tag
    DB.Where("username = ?", "user1").First(&user1)
    DB.Where("username = ?", "user2").First(&user2)
    DB.Where("name = ?", "Computing").First(&tag1)
    DB.Where("name = ?", "BZA").First(&tag2)
    DB.Where("name = ?", "CS").First(&tag3)
    DB.Where("name = ?", "General").First(&tag4)
    DB.Where("name = ?", "IS").First(&tag5)

    // Create initial threads with multiple tags
    threads := []Thread{
        {Title: "Discussion on Computing", Content: "Let's discuss the various aspects of computing. What are your thoughts on the latest trends in computing? How do you see the future of computing evolving?", UserID: user1.ID, Tags: []Tag{tag1, tag2}},
        {Title: "Advanced Algorithms", Content: "This thread is dedicated to discussing advanced algorithms. Share your knowledge and experiences with different algorithms and their applications.", UserID: user2.ID, Tags: []Tag{tag2, tag3}},
        {Title: "Data Structures", Content: "Data structures are fundamental to computer science. Let's talk about different data structures and their use cases.", UserID: user1.ID, Tags: []Tag{tag1, tag3}},
        {Title: "Operating Systems", Content: "Operating systems are crucial for managing computer hardware and software resources. What are your favorite operating systems and why?", UserID: user2.ID, Tags: []Tag{tag1}},
        {Title: "Database Management", Content: "Databases are essential for storing and managing data. Share your experiences with different database management systems.", UserID: user1.ID, Tags: []Tag{tag2, tag4}},
        {Title: "Computer Networks", Content: "Networking is a key aspect of computing. Let's discuss different networking protocols and their applications.", UserID: user2.ID, Tags: []Tag{tag3, tag5}},
        {Title: "Software Engineering", Content: "Software engineering involves designing, developing, and maintaining software. Share your best practices and experiences in software engineering.", UserID: user1.ID, Tags: []Tag{tag1, tag5}},
        {Title: "Artificial Intelligence", Content: "AI is transforming various industries. Let's discuss the latest advancements and applications of AI.", UserID: user2.ID, Tags: []Tag{tag2, tag3}},
        {Title: "Cybersecurity", Content: "Cybersecurity is critical for protecting information systems. Share your knowledge and experiences in cybersecurity.", UserID: user1.ID, Tags: []Tag{tag4, tag5}},
        {Title: "Web Development", Content: "Web development is constantly evolving. Let's talk about the latest trends and technologies in web development.", UserID: user2.ID, Tags: []Tag{tag1, tag4}},
        {Title: "Mobile App Development", Content: "Mobile apps are ubiquitous. Share your experiences and best practices in mobile app development.", UserID: user1.ID, Tags: []Tag{tag2, tag5}},
        {Title: "Cloud Computing", Content: "Cloud computing is revolutionizing IT. Let's discuss different cloud service models and their applications.", UserID: user2.ID, Tags: []Tag{tag3, tag4}},
        {Title: "DevOps", Content: "DevOps practices are essential for modern software development. Share your experiences with different DevOps tools and practices.", UserID: user1.ID, Tags: []Tag{tag1, tag3}},
        {Title: "Big Data", Content: "Big data is transforming how we handle data. Let's discuss different big data technologies and their applications.", UserID: user2.ID, Tags: []Tag{tag2, tag4}},
        {Title: "Blockchain Technology", Content: "Blockchain technology is gaining traction. Share your knowledge and experiences with blockchain and its applications.", UserID: user1.ID, Tags: []Tag{tag3, tag5}},
        {Title: "Quantum Computing", Content: "Quantum computing is an emerging field. Let's discuss the principles and potential applications of quantum computing.", UserID: user2.ID, Tags: []Tag{tag1, tag2}},
        {Title: "Human-Computer Interaction", Content: "HCI is crucial for designing user-friendly interfaces. Share your experiences and best practices in HCI.", UserID: user1.ID, Tags: []Tag{tag4, tag5}},
        {Title: "Computer Graphics", Content: "Computer graphics are essential for visualizing data. Let's discuss different graphics techniques and their applications.", UserID: user2.ID, Tags: []Tag{tag1, tag3}},
        {Title: "Embedded Systems", Content: "Embedded systems are used in various applications. Share your knowledge and experiences with embedded systems.", UserID: user1.ID, Tags: []Tag{tag2, tag4}},
        {Title: "Robotics", Content: "Robotics is an exciting field. Let's discuss the latest advancements and applications of robotics.", UserID: user2.ID, Tags: []Tag{tag3, tag5}},
    }
    for _, thread := range threads {
        if err := DB.Create(&thread).Error; err != nil {
            log.Printf("Failed to create thread: %v", err)
        }
    }

    // Fetch the created threads to get their IDs
    var createdThreads []Thread
    DB.Find(&createdThreads)

    // Create comments for some threads
    comments := []Comment{
        {Content: "This is a very informative thread!", UserID: user1.ID, ThreadID: createdThreads[0].ID},
        {Content: "I learned a lot from this discussion.", UserID: user2.ID, ThreadID: createdThreads[0].ID},
        {Content: "Great insights on data structures.", UserID: user1.ID, ThreadID: createdThreads[1].ID},
        {Content: "Thanks for sharing this information.", UserID: user2.ID, ThreadID: createdThreads[1].ID},
        {Content: "This thread helped me understand operating systems better.", UserID: user1.ID, ThreadID: createdThreads[2].ID},
        {Content: "I appreciate the detailed explanation.", UserID: user2.ID, ThreadID: createdThreads[2].ID},
        {Content: "This is a must-read for anyone interested in AI.", UserID: user1.ID, ThreadID: createdThreads[7].ID},
        {Content: "Cybersecurity is such an important topic.", UserID: user2.ID, ThreadID: createdThreads[8].ID},
        {Content: "Web development is evolving so fast!", UserID: user1.ID, ThreadID: createdThreads[9].ID},
        {Content: "Mobile app development is a great skill to have.", UserID: user2.ID, ThreadID: createdThreads[10].ID},
        {Content: "This thread is very helpful.", UserID: user1.ID, ThreadID: createdThreads[11].ID},
        {Content: "I found this discussion very insightful.", UserID: user2.ID, ThreadID: createdThreads[11].ID},
        {Content: "DevOps practices are essential for modern software development.", UserID: user1.ID, ThreadID: createdThreads[12].ID},
        {Content: "Big data is transforming how we handle data.", UserID: user2.ID, ThreadID: createdThreads[13].ID},
        {Content: "Blockchain technology is gaining traction.", UserID: user1.ID, ThreadID: createdThreads[14].ID},
        {Content: "Quantum computing is an emerging field.", UserID: user2.ID, ThreadID: createdThreads[15].ID},
        {Content: "HCI is crucial for designing user-friendly interfaces.", UserID: user1.ID, ThreadID: createdThreads[16].ID},
        {Content: "Computer graphics are essential for visualizing data.", UserID: user2.ID, ThreadID: createdThreads[17].ID},
        {Content: "Robotics is an exciting field.", UserID: user2.ID, ThreadID: createdThreads[19].ID},
        {Content: "This is a very informative thread!", UserID: user1.ID, ThreadID: createdThreads[0].ID},
        {Content: "I learned a lot from this discussion.", UserID: user2.ID, ThreadID: createdThreads[0].ID},
        {Content: "Great insights on data structures.", UserID: user1.ID, ThreadID: createdThreads[1].ID},
        {Content: "Thanks for sharing this information.", UserID: user2.ID, ThreadID: createdThreads[1].ID},
        {Content: "This thread helped me understand operating systems better.", UserID: user1.ID, ThreadID: createdThreads[2].ID},
        {Content: "I appreciate the detailed explanation.", UserID: user2.ID, ThreadID: createdThreads[2].ID},
        {Content: "This is a must-read for anyone interested in AI.", UserID: user1.ID, ThreadID: createdThreads[3].ID},
        {Content: "Cybersecurity is such an important topic.", UserID: user2.ID, ThreadID: createdThreads[3].ID},
        {Content: "Web development is evolving so fast!", UserID: user1.ID, ThreadID: createdThreads[4].ID},
        {Content: "Mobile app development is a great skill to have.", UserID: user2.ID, ThreadID: createdThreads[4].ID},
        {Content: "This thread is very helpful.", UserID: user1.ID, ThreadID: createdThreads[5].ID},
        {Content: "I found this discussion very insightful.", UserID: user2.ID, ThreadID: createdThreads[5].ID},
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
    if err := DB.Exec("DELETE FROM thread_tags").Error; err != nil {
        log.Printf("Failed to delete thread_tags: %v", err)
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
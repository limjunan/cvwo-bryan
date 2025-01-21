package db

import (
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
    "log"
    "os"
    "time"
)

var DB *gorm.DB

func Init() {
    log.Println("DB_HOST:", os.Getenv("DB_HOST"))
    log.Println("DB_USER:", os.Getenv("DB_USER"))
    log.Println("DB_PASSWORD:", os.Getenv("DB_PASSWORD"))
    log.Println("DB_NAME:", os.Getenv("DB_NAME"))
    log.Println("DB_PORT:", os.Getenv("DB_PORT"))
    log.Println("DB_SSLMODE:", os.Getenv("DB_SSLMODE"))
    log.Println("DB_TIMEZONE:", os.Getenv("DB_TIMEZONE"))

    dsn := "host=" + os.Getenv("DB_HOST") +
        " user=" + os.Getenv("DB_USER") +
        " password=" + os.Getenv("DB_PASSWORD") +
        " dbname=" + os.Getenv("DB_NAME") +
        " port=" + os.Getenv("DB_PORT") +
        " sslmode=" + os.Getenv("DB_SSLMODE") +
        " TimeZone=" + os.Getenv("DB_TIMEZONE")

    log.Println("DSN:", dsn)

    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.New(
            log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
            logger.Config{
                SlowThreshold: time.Second,   // Slow SQL threshold
                LogLevel:      logger.Error,  // Log level
                Colorful:      true,          // Disable color
            },
        ),
    })
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    log.Println("Connected to the database successfully")

    // Log the current database name
    var currentDB string
    err = DB.Raw("SELECT current_database()").Scan(&currentDB).Error
    if err != nil {
        log.Fatal("Failed to get current database:", err)
    }
    log.Println("Current database:", currentDB)

    // Run migrations
    err = DB.AutoMigrate(&User{}, &Thread{}, &Comment{}, &Tag{})
    if err != nil {
        log.Fatal("Failed to run migrations:", err)
    }

    log.Println("Migrations ran successfully")

    SetDB(DB)
    Seed()
}
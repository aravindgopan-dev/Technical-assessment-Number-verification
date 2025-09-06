package pkg

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := (os.Getenv("DATABASE_URL"))
	var err error

	// Configure database connection with connection pooling
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		// Disable automatic transaction for better performance
		SkipDefaultTransaction: true,
		// Prepare statements for better performance
		PrepareStmt: true,
	})
	if err != nil {
		log.Fatal("Error connecting to database")
	}

	// Configure connection pool
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatal("Error getting underlying sql.DB")
	}

	// Set connection pool settings
	sqlDB.SetMaxOpenConns(25)                 // Maximum number of open connections
	sqlDB.SetMaxIdleConns(10)                 // Maximum number of idle connections
	sqlDB.SetConnMaxLifetime(5 * time.Minute) // Maximum lifetime of a connection
	sqlDB.SetConnMaxIdleTime(1 * time.Minute) // Maximum idle time of a connection

	fmt.Println("Connected to database with connection pooling configured")
}

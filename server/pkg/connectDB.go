package pkg

import (
	"fmt"
	"os"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"
	"log"
)

var DB *gorm.DB

func ConnectDB() {
	dsn:=(os.Getenv("DATABASE_URL"))
	var err error
	DB,err=gorm.Open(postgres.Open(dsn),&gorm.Config{})
	if err!=nil{
		log.Fatal("Error connecting to database")
	}
	fmt.Println("Connected to database")
}
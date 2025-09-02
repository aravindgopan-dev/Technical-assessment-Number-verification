package pkg

import (
	"server/internals/modals"
	"log"
)

func Migrate() {
	err:=DB.AutoMigrate(&modals.User{})
	if err!=nil{
		log.Fatal("Error migrating users table")
	}
	err=DB.AutoMigrate(&modals.Armstrong{})
	if err!=nil{
		log.Fatal("Error migrating armstrongs table")
	}
}

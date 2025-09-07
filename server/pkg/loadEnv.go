package pkg

import (
	"fmt"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load("../../.env")
	if err != nil {
		err = godotenv.Load()
		if err != nil {
			fmt.Println("Warning: .env file not found, using system environment variables")
			return
		}
	}
	fmt.Println("Environment variables loaded successfully")
}

package pkg

import (
	"fmt"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	// Try to load .env from the server root directory (two levels up from pkg/)
	err := godotenv.Load("../../.env")
	if err != nil {
		// Fallback to current directory
		err = godotenv.Load()
		if err != nil {
			fmt.Println("Warning: .env file not found, using system environment variables")
			return
		}
	}
	fmt.Println("Environment variables loaded successfully")
}

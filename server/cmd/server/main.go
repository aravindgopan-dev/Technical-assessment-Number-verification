package main

import (
	"fmt"
	"os"
	"server/internals/handler"
	"server/pkg"

	"github.com/gin-gonic/gin"
)

func init() {
	pkg.LoadEnv()
	//run only when db change
	//pkg.Migrate()
}

func main() {
	// Connect to database and Redis with proper error handling
	if err := pkg.ConnectDB(); err != nil {
		fmt.Printf("Warning: Database connection failed: %v\n", err)
		fmt.Println("Server will start without database connection")
	}

	if err := pkg.ConnectRedis(); err != nil {
		fmt.Printf("Warning: Redis connection failed: %v\n", err)
		fmt.Println("Server will start without Redis connection")
	}

	r := gin.Default()

	// Setup API routes
	api := r.Group("/api")
	api.Use(pkg.RateLimitMiddleware())
	handler.SetupAuthRoutes(api)
	handler.SetupArmstrongRoutes(api)
	handler.SetupUserRoutes(api)

	port := os.Getenv("PORT")
	if port == "" {
		port = "10000" // Render.com default port
	}

	fmt.Printf("Starting server on port %s\n", port)
	r.Run(":" + port)
}

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
	pkg.ConnectDB()
	pkg.ConnectRedis()
	//run only when db change
	//pkg.Migrate()
}

func main() {
	r := gin.Default()
	
	// Setup API routes
	api := r.Group("/api")
	api.Use(pkg.RateLimitMiddleware())
	handler.SetupAuthRoutes(api)
	handler.SetupArmstrongRoutes(api)
	handler.SetupUserRoutes(api)
	
	// Get port from environment variable, fallback to 10000 for local development
	port := os.Getenv("PORT")
	if port == "" {
		port = "10000"
	}
	
	fmt.Printf("Server starting on port %s\n", port)
	r.Run(":" + port)
}
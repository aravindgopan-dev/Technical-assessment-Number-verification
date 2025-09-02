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

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000" // Default port for local development
	}
	r.Run("0.0.0.0:" + port)
	fmt.Println("Hello, World!")
}

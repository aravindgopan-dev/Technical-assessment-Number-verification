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
	pkg.Migrate()
}

func main() {
	r := gin.Default()

	api := r.Group("/api")
	api.Use(pkg.RateLimitMiddleware())
	handler.SetupAuthRoutes(api)
	handler.SetupArmstrongRoutes(api)
	handler.SetupUserRoutes(api)

	port := os.Getenv("PORT")
	if port == "" {
		port = "10000"
	}
	r.Run(":" + port)
	fmt.Println("Hello, World!")
}

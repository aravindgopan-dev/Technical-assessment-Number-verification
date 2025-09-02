package main

import (
	"fmt"
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

	
	r.Run("0.0.0.0:10000")
	fmt.Println("Hello, World!")
}

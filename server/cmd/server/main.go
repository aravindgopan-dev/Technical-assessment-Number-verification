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

	//run only when db change
	//pkg.Migrate()
}

func main() {

	r := gin.Default()

	// Setup API routes
	api := r.Group("/api")

	handler.SetupAuthRoutes(api)
	handler.SetupArmstrongRoutes(api)


	r.Run(":" + os.Getenv("PORT"))
	fmt.Println("Hello, World!")
}

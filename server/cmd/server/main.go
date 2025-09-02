package main

import (
	"os"
	"fmt"
	"server/pkg"
)

func main() {
	pkg.LoadEnv()	
	pkg.ConnectDB()
	fmt.Println(os.Getenv("PORT"))
	fmt.Println("Hello, World!")
}
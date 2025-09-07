package middleware

import (
	"fmt"
	"net/http"
	"server/pkg"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(c *gin.Context) {
	token := c.GetHeader("Authorization")

	fmt.Println("token is " + token)

	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
		c.Abort()
		return
	}

	if len(token) > 7 && token[:7] == "Bearer " {
		token = token[7:]
	}

	claims, err := pkg.ValidateJWT(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}
	fmt.Println("user id is " + claims.UserID)
	c.Set("user_id", claims.UserID)
	c.Next()
}

package handler

import (
	"net/http"
	"server/internals/middleware"
	"server/internals/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {
	users, err := services.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
		"count": len(users),
	})
}

func GetUser(c *gin.Context) {
	userIDStr := c.Param("id")
	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	user, armstrongs, err := services.GetUserWithArmstrongNumbers(uint(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user":              user,
		"armstrong_numbers": armstrongs,
		"armstrong_count":   len(armstrongs),
	})
}

func SetupUserRoutes(r *gin.RouterGroup) {
	users := r.Group("/users", middleware.AuthMiddleware)
	{
		users.GET("/", GetAllUsers)
		users.GET("/:id", GetUser)
	}
}

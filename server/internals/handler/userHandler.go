package handler

import (
	"net/http"
	"server/internals/middleware"
	"server/internals/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "1")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page parameter"})
		return
	}

	response, err := services.GetAllUsers(page)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
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

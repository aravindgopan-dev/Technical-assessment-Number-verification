package handler

import (
	"net/http"
	"server/internals/middleware"
	"server/internals/services"
	"strconv"
	"github.com/gin-gonic/gin"

)

func CreateArmstrong(c *gin.Context) {
	req := struct {
		Number int `json:"number"`
	}{}

	userIdInt, err := strconv.Atoi(c.GetString("user_id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}


	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	isArmstrong := services.VerifyArmstrongNumber(req.Number,userIdInt)
	c.JSON(http.StatusOK, gin.H{"isArmstrong": isArmstrong})
}



func SetupArmstrongRoutes(r *gin.RouterGroup) {
	armstrong := r.Group("/armstrong", middleware.AuthMiddleware)
	{
		armstrong.POST("/verify", CreateArmstrong)
	}
}

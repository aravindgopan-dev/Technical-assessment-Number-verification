package pkg

import (
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

var limiter = rate.NewLimiter(rate.Every(time.Minute/100), 100)

func RateLimitMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !limiter.Allow() {
			c.JSON(429, gin.H{"error": "Rate limit exceeded"})
			c.Abort()
			return
		}
		c.Next()
	}
}

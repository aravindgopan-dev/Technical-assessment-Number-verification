package pkg

import (
	"context"
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client
var ctx = context.Background()

func ConnectRedis() error {
	redisURL := os.Getenv("REDIS_URL")

	if redisURL == "" {
		return fmt.Errorf("REDIS_URL environment variable is not set")
	}

	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		return fmt.Errorf("failed to parse Redis URL: %w", err)
	}

	RedisClient = redis.NewClient(opt)

	// Test connection with PING
	pong, err := RedisClient.Ping(ctx).Result()
	if err != nil {
		return fmt.Errorf("could not connect to Redis: %w", err)
	}

	fmt.Println("Connected to Redis:", pong)
	return nil
}

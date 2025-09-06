package pkg

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client
var ctx = context.Background()

func ConnectRedis() {

	redisURL := os.Getenv("REDIS_URL")

	if redisURL == "" {
		log.Fatal("REDIS_URL is not set")
	}

	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatalf("Failed to parse Redis URL: %v", err)
	}

	// Configure connection pool for better performance
	opt.PoolSize = 20    // Maximum number of connections
	opt.MinIdleConns = 5 // Minimum number of idle connections
	opt.MaxRetries = 3   // Maximum number of retries
	opt.DialTimeout = 5 * time.Second
	opt.ReadTimeout = 3 * time.Second
	opt.WriteTimeout = 3 * time.Second
	opt.PoolTimeout = 4 * time.Second

	RedisClient = redis.NewClient(opt)

	// Test connection with PING
	pong, err := RedisClient.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Could not connect to Redis: %v", err)
	}

	fmt.Println("Connected to Redis:", pong)

}

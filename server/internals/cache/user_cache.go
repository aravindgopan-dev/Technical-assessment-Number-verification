package cache

import (
	"context"
	"encoding/json"
	"fmt"
	"server/internals/types"
	"server/pkg"
	"time"
)

const (
	AllUsersCacheKey = "all_users"
	UserCacheTTL     = 5 * time.Minute
)

// GetAllCachedUsers retrieves all users from cache
func GetAllCachedUsers() (*types.AllUsersCacheResponse, error) {
	ctx := context.Background()

	cachedData, err := pkg.RedisClient.Get(ctx, AllUsersCacheKey).Result()
	if err != nil {
		return nil, err
	}

	var cachedResponse types.AllUsersCacheResponse
	if err := json.Unmarshal([]byte(cachedData), &cachedResponse); err != nil {
		return nil, err
	}

	fmt.Println("Cache hit: returning all cached users")
	return &cachedResponse, nil
}

// SetAllCachedUsers stores all users in cache
func SetAllCachedUsers(response *types.AllUsersCacheResponse) error {
	ctx := context.Background()

	jsonData, err := json.Marshal(response)
	if err != nil {
		return err
	}

	err = pkg.RedisClient.Set(ctx, AllUsersCacheKey, jsonData, UserCacheTTL).Err()
	if err == nil {
		fmt.Println("Cached all users data for 5 minutes")
	}
	return err
}

// InvalidateUsersCache removes all cached users data
func InvalidateUsersCache() {
	ctx := context.Background()

	// Remove all users cache
	pkg.RedisClient.Del(ctx, AllUsersCacheKey)

	fmt.Println("Invalidated all users cache")
}

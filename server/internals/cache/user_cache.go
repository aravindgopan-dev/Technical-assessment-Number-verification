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

func InvalidateUsersCache() {
	ctx := context.Background()

	pkg.RedisClient.Del(ctx, AllUsersCacheKey)

	fmt.Println("Invalidated all users cache")
}

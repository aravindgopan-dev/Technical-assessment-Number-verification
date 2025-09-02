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
	UserCacheKeyPrefix = "all_users_page_"
	UserCacheTTL       = 5 * time.Minute
)



// GetCachedUsers retrieves paginated users from cache
func GetCachedUsers(page int) (*types.PaginatedUsersResponse, error) {
	cacheKey := fmt.Sprintf("%s%d", UserCacheKeyPrefix, page)
	ctx := context.Background()

	cachedData, err := pkg.RedisClient.Get(ctx, cacheKey).Result()
	if err != nil {
		return nil, err
	}

	var cachedResponse types.PaginatedUsersResponse
	if err := json.Unmarshal([]byte(cachedData), &cachedResponse); err != nil {
		return nil, err
	}

	fmt.Println("Cache hit: returning cached users")
	return &cachedResponse, nil
}

// SetCachedUsers stores paginated users in cache
func SetCachedUsers(page int, response *types.PaginatedUsersResponse) error {
	cacheKey := fmt.Sprintf("%s%d", UserCacheKeyPrefix, page)
	ctx := context.Background()

	jsonData, err := json.Marshal(response)
	if err != nil {
		return err
	}

	err = pkg.RedisClient.Set(ctx, cacheKey, jsonData, UserCacheTTL).Err()
	if err == nil {
		fmt.Println("Cached users data for 5 minutes")
	}
	return err
}

// InvalidateUsersCache removes all cached users data
func InvalidateUsersCache() {
	ctx := context.Background()

	// Get all cache keys that match the pattern
	pattern := UserCacheKeyPrefix + "*"
	keys, err := pkg.RedisClient.Keys(ctx, pattern).Result()
	if err != nil {
		fmt.Printf("Error getting cache keys: %v\n", err)
		return
	}

	// Delete all matching keys
	if len(keys) > 0 {
		err = pkg.RedisClient.Del(ctx, keys...).Err()
		if err != nil {
			fmt.Printf("Error invalidating users cache: %v\n", err)
		} else {
			fmt.Printf("Users cache invalidated successfully (%d keys removed)\n", len(keys))
		}
	} else {
		fmt.Println("No users cache keys found to invalidate")
	}
}

package services

import (
	"context"
	"encoding/json"
	"fmt"
	"server/internals/modals"
	"server/pkg"
	"time"
)

type UserResponse struct {
	UserID         uint   `json:"user_id"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	CreatedAt      string `json:"created_at"`
	ArmstrongCount int    `json:"armstrong_count"`
}

type ArmstrongWithUserResponse struct {
	ArmstrongID uint   `json:"armstrong_id"`
	Number      string `json:"number"`
	UserName    string `json:"user_name"`
	UserEmail   string `json:"user_email"`
	CreatedAt   string `json:"created_at"`
}

type ArmstrongResponse struct {
	Number    string `json:"number"`
	CreatedAt string `json:"created_at"`
}

func GetAllUsers() ([]UserResponse, error) {
	cacheKey := "all_users"
	ctx := context.Background()


	cachedData, err := pkg.RedisClient.Get(ctx, cacheKey).Result()
	if err == nil {
		var cachedUsers []UserResponse
		if err := json.Unmarshal([]byte(cachedData), &cachedUsers); err == nil {
			fmt.Println("Cache hit: returning cached users")
			return cachedUsers, nil
		}
	}


	fmt.Println("Cache miss: fetching users from database")
	var users []modals.User
	if err := pkg.DB.Preload("ArmstrongNumbers").Find(&users).Error; err != nil {
		return nil, err
	}

	var userResponses []UserResponse
	for _, user := range users {
		userResponses = append(userResponses, UserResponse{
			UserID:         user.UserID,
			Name:           user.Name,
			Email:          user.Email,
			CreatedAt:      user.CreatedAt.Format("2006-01-02 15:04:05"),
			ArmstrongCount: len(user.ArmstrongNumbers),
		})
	}

	// Cache the result for 5 minutes
	jsonData, err := json.Marshal(userResponses)
	if err == nil {
		pkg.RedisClient.Set(ctx, cacheKey, jsonData, 5*time.Minute)
		fmt.Println("Cached users data for 5 minutes")
	}

	return userResponses, nil
}

func GetUserWithArmstrongNumbers(userID uint) (UserResponse, []ArmstrongResponse, error) {
	// Get user details
	var user modals.User
	if err := pkg.DB.First(&user, userID).Error; err != nil {
		return UserResponse{}, nil, err
	}

	userResponse := UserResponse{
		UserID:    user.UserID,
		Name:      user.Name,
		Email:     user.Email,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	// Get Armstrong numbers for this user (simplified response)
	var armstrongs []modals.Armstrong
	if err := pkg.DB.Where("user_id = ?", userID).Find(&armstrongs).Error; err != nil {
		return UserResponse{}, nil, err
	}

	var armstrongResponses []ArmstrongResponse
	for _, armstrong := range armstrongs {
		armstrongResponses = append(armstrongResponses, ArmstrongResponse{
			Number:    armstrong.Number,
			CreatedAt: armstrong.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return userResponse, armstrongResponses, nil
}

// InvalidateUsersCache removes the cached users data
func InvalidateUsersCache() {
	cacheKey := "all_users"
	ctx := context.Background()
	err := pkg.RedisClient.Del(ctx, cacheKey).Err()
	if err != nil {
		fmt.Printf("Error invalidating users cache: %v\n", err)
	} else {
		fmt.Println("Users cache invalidated successfully")
	}
}

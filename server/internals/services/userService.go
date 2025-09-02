package services

import (
	"fmt"
	"server/internals/cache"
	"server/internals/modals"
	"server/internals/types"
	"server/pkg"
)

func GetAllUsers(page int) (types.PaginatedUsersResponse, error) {
	// Set default values
	if page <= 0 {
		page = 1
	}
	limit := 10

	// Try to get from cache
	if cachedResponse, err := cache.GetCachedUsers(page); err == nil {
		return *cachedResponse, nil
	}

	fmt.Println("Cache miss: fetching users from database")

	// Use GORM's efficient pagination with count
	var users []modals.User
	var total int64

	// Get count and paginated results efficiently
	query := pkg.DB.Model(&modals.User{}).Preload("ArmstrongNumbers")

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return types.PaginatedUsersResponse{}, err
	}

	// Calculate offset and get paginated results
	offset := (page - 1) * limit
	if err := query.Offset(offset).Limit(limit).Find(&users).Error; err != nil {
		return types.PaginatedUsersResponse{}, err
	}

	// Convert to response format
	var userResponses []types.UserResponse
	for _, user := range users {
		userResponses = append(userResponses, types.UserResponse{
			UserID:         user.UserID,
			Name:           user.Name,
			Email:          user.Email,
			CreatedAt:      user.CreatedAt.Format("2006-01-02 15:04:05"),
			ArmstrongCount: len(user.ArmstrongNumbers),
		})
	}

	// Calculate total pages
	totalPages := int((total + int64(limit) - 1) / int64(limit))

	response := types.PaginatedUsersResponse{
		Users:      userResponses,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	}

	// Cache the result
	cache.SetCachedUsers(page, &response)

	return response, nil
}

func GetUserWithArmstrongNumbers(userID uint) (types.UserResponse, []types.ArmstrongResponse, error) {
	// Get user details
	var user modals.User
	if err := pkg.DB.First(&user, userID).Error; err != nil {
		return types.UserResponse{}, nil, err
	}

	userResponse := types.UserResponse{
		UserID:    user.UserID,
		Name:      user.Name,
		Email:     user.Email,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	// Get Armstrong numbers for this user (simplified response)
	var armstrongs []modals.Armstrong
	if err := pkg.DB.Where("user_id = ?", userID).Find(&armstrongs).Error; err != nil {
		return types.UserResponse{}, nil, err
	}

	var armstrongResponses []types.ArmstrongResponse
	for _, armstrong := range armstrongs {
		armstrongResponses = append(armstrongResponses, types.ArmstrongResponse{
			Number:    armstrong.Number,
			CreatedAt: armstrong.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return userResponse, armstrongResponses, nil
}



// InvalidateUsersCache removes all cached users data
func InvalidateUsersCache() {
	cache.InvalidateUsersCache()
}

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
	limit := 5

	// Try to get all users from cache first
	if cachedAllUsers, err := cache.GetAllCachedUsers(); err == nil {
		// Return paginated response from cached data
		return paginateFromCachedUsers(cachedAllUsers, page, limit), nil
	}

	fmt.Println("Cache miss: fetching all users from database")

	// Fetch all users from database
	var users []modals.User
	var total int64

	// Get all users with their Armstrong numbers
	query := pkg.DB.Model(&modals.User{}).Preload("ArmstrongNumbers")

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return types.PaginatedUsersResponse{}, err
	}

	// Get all users
	if err := query.Find(&users).Error; err != nil {
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

	// Cache all users
	allUsersCache := &types.AllUsersCacheResponse{
		Users: userResponses,
		Total: total,
	}
	cache.SetAllCachedUsers(allUsersCache)

	// Return paginated response
	return paginateFromCachedUsers(allUsersCache, page, limit), nil
}

// paginateFromCachedUsers creates a paginated response from cached all users data
func paginateFromCachedUsers(cachedData *types.AllUsersCacheResponse, page, limit int) types.PaginatedUsersResponse {
	total := cachedData.Total
	allUsers := cachedData.Users

	// Calculate pagination
	offset := (page - 1) * limit
	end := offset + limit

	// Ensure we don't go out of bounds
	if offset >= len(allUsers) {
		return types.PaginatedUsersResponse{
			Users:      []types.UserResponse{},
			Total:      total,
			Page:       page,
			Limit:      limit,
			TotalPages: int((total + int64(limit) - 1) / int64(limit)),
		}
	}

	if end > len(allUsers) {
		end = len(allUsers)
	}

	// Get the page slice
	paginatedUsers := allUsers[offset:end]

	// Calculate total pages
	totalPages := int((total + int64(limit) - 1) / int64(limit))

	return types.PaginatedUsersResponse{
		Users:      paginatedUsers,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	}
}

func GetUserWithArmstrongNumbers(userID uint) (types.UserResponse, []types.ArmstrongResponse, error) {
	// Get user details with Armstrong numbers in a single query using Preload
	var user modals.User
	if err := pkg.DB.Preload("ArmstrongNumbers").First(&user, userID).Error; err != nil {
		return types.UserResponse{}, nil, err
	}

	userResponse := types.UserResponse{
		UserID:    user.UserID,
		Name:      user.Name,
		Email:     user.Email,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	// Convert Armstrong numbers to response format
	var armstrongResponses []types.ArmstrongResponse
	for _, armstrong := range user.ArmstrongNumbers {
		armstrongResponses = append(armstrongResponses, types.ArmstrongResponse{
			ArmstrongID: armstrong.ArmstrongID,
			Number:      armstrong.Number,
			IsArmstrong: armstrong.IsArmstrong,
			UserID:      armstrong.UserID,
			CreatedAt:   armstrong.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return userResponse, armstrongResponses, nil
}

// InvalidateUsersCache removes all cached users data
func InvalidateUsersCache() {
	cache.InvalidateUsersCache()
}

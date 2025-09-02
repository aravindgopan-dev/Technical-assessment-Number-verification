package services

import (
	"errors"
	"fmt"
	"server/internals/modals"
	"server/internals/types"
	"server/pkg"

	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(req *types.RegisterRequest) (*types.AuthResponse, error) {

	var existingUser modals.User
	result := pkg.DB.Where("email = ?", req.Email).First(&existingUser)
	if result.Error == nil {
		return nil, errors.New("user with this email already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	// Create new user
	user := modals.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	// Save to database
	if err := pkg.DB.Create(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	InvalidateUsersCache()

	// Generate JWT token
	token, err := pkg.GenerateJWT(fmt.Sprintf("%d", user.UserID))
	if err != nil {
		return nil, fmt.Errorf("failed to generate token: %w", err)
	}

	return &types.AuthResponse{
		Message: "User registered successfully",
		User: &modals.User{
			UserID: user.UserID,
			Name:   user.Name,
			Email:  user.Email,
		},
		Token: token,
	}, nil
}

func LoginUser(req *types.LoginRequest) (*types.AuthResponse, error) {

	var user modals.User
	result := pkg.DB.Where("email = ?", req.Email).First(&user)
	if result.Error != nil {
		return nil, errors.New("user not found")
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, errors.New("invalid password")
	}

	// Generate JWT token
	token, err := pkg.GenerateJWT(fmt.Sprintf("%d", user.UserID))
	if err != nil {
		return nil, fmt.Errorf("failed to generate token: %w", err)
	}

	return &types.AuthResponse{
		Message: "User logged in successfully",
		User: &modals.User{
			UserID: user.UserID,
			Name:   user.Name,
			Email:  user.Email,
		},
		Token: token,
	}, nil
}

func ValidateUser(email string) error {
	if email == "" {
		return errors.New("email is required")
	}

	// Check if user exists in database
	var user modals.User
	result := pkg.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return errors.New("user not found")
	}

	return nil
}

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

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	user := modals.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	if err := pkg.DB.Create(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	InvalidateUsersCache()

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

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, errors.New("invalid password")
	}

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

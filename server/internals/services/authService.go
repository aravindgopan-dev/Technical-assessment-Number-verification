package services

import (
	"errors"
	"fmt"
	"server/internals/modals"
	"server/pkg"

	"golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	Message string       `json:"message"`
	User    *modals.User `json:"user,omitempty"`
	Token   string       `json:"token,omitempty"`
}



func RegisterUser(req *RegisterRequest) (*AuthResponse, error) {

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
		Name:     req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	// Save to database
	if err := pkg.DB.Create(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	// Generate JWT token
	token, err := pkg.GenerateJWT(fmt.Sprintf("%d", user.UserID))
	if err != nil {
		return nil, fmt.Errorf("failed to generate token: %w", err)
	}

	return &AuthResponse{
		Message: "User registered successfully",
		User: &modals.User{
			UserID: user.UserID,
			Name:   user.Name,
			Email:  user.Email,
		},
		Token: token,
	}, nil
}

func LoginUser(req *LoginRequest) (*AuthResponse, error) {

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

	return &AuthResponse{
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

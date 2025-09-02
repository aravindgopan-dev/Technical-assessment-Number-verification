package types

import "server/internals/modals"

// RegisterRequest represents the request payload for user registration
type RegisterRequest struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// LoginRequest represents the request payload for user login
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// AuthResponse represents the response payload for authentication operations
type AuthResponse struct {
	Message string       `json:"message"`
	User    *modals.User `json:"user,omitempty"`
	Token   string       `json:"token,omitempty"`
}

package types

import "server/internals/modals"

type RegisterRequest struct {
	Name     string `json:"name" binding:"required"`
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

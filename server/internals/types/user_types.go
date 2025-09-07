package types

type UserResponse struct {
	UserID         uint   `json:"user_id"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	CreatedAt      string `json:"created_at"`
	ArmstrongCount int    `json:"armstrong_count"`
}

type PaginatedUsersResponse struct {
	Users      []UserResponse `json:"users"`
	Total      int64          `json:"total"`
	Page       int            `json:"page"`
	Limit      int            `json:"limit"`
	TotalPages int            `json:"total_pages"`
}

type AllUsersCacheResponse struct {
	Users []UserResponse `json:"users"`
	Total int64          `json:"total"`
}

type ArmstrongWithUserResponse struct {
	ArmstrongID uint   `json:"armstrong_id"`
	Number      string `json:"number"`
	IsArmstrong bool   `json:"is_armstrong"`
	UserID      uint   `json:"user_id"`
	UserName    string `json:"user_name"`
	UserEmail   string `json:"user_email"`
	CreatedAt   string `json:"created_at"`
}

type ArmstrongResponse struct {
	ArmstrongID uint   `json:"armstrong_id"`
	Number      string `json:"number"`
	IsArmstrong bool   `json:"is_armstrong"`
	UserID      uint   `json:"user_id"`
	CreatedAt   string `json:"created_at"`
}

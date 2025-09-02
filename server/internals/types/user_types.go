package types

// UserResponse represents a user in API responses
type UserResponse struct {
	UserID         uint   `json:"user_id"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	CreatedAt      string `json:"created_at"`
	ArmstrongCount int    `json:"armstrong_count"`
}

// PaginatedUsersResponse represents paginated users data
type PaginatedUsersResponse struct {
	Users      []UserResponse `json:"users"`
	Total      int64          `json:"total"`
	Page       int            `json:"page"`
	Limit      int            `json:"limit"`
	TotalPages int            `json:"total_pages"`
}

// ArmstrongWithUserResponse represents Armstrong number with user info
type ArmstrongWithUserResponse struct {
	ArmstrongID uint   `json:"armstrong_id"`
	Number      string `json:"number"`
	IsArmstrong bool   `json:"is_armstrong"`
	UserID      uint   `json:"user_id"`
	UserName    string `json:"user_name"`
	UserEmail   string `json:"user_email"`
	CreatedAt   string `json:"created_at"`
}

// ArmstrongResponse represents Armstrong number in API responses
type ArmstrongResponse struct {
	ArmstrongID uint   `json:"armstrong_id"`
	Number      string `json:"number"`
	IsArmstrong bool   `json:"is_armstrong"`
	UserID      uint   `json:"user_id"`
	CreatedAt   string `json:"created_at"`
}

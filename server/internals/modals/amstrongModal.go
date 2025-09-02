package modals

import (
	"time"
)

type Armstrong struct {
	ArmstrongID uint   `gorm:"primaryKey;autoIncrement;column:armstrong_id"`
	Number      string `gorm:"not null"`
	CreatedAt   time.Time
	UserID      uint   `gorm:"not null"`
}
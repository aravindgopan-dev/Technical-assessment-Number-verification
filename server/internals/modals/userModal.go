package modals
import (
	"time"
)

type User struct {
	UserID           uint   `gorm:"primaryKey;autoIncrement;column:user_id"`
	Name             string `gorm:"not null"`
	Email            string `gorm:"unique;not null"`
	Password         string `gorm:"not null"`
	CreatedAt        time.Time
	ArmstrongNumbers []Armstrong `gorm:"foreignKey:UserID"`
}

package services

import (
	"server/internals/modals"
	"server/pkg"
	"strconv"
)

func VerifyArmstrongNumber(n int, userIdInt int) bool {
	isArmstrongResult := isArmstrong(n)

	record := &modals.Armstrong{
		Number:      strconv.Itoa(n),
		UserID:      uint(userIdInt),
		IsArmstrong: isArmstrongResult,
	}

	pkg.DB.Create(record)

	return isArmstrongResult
}

func isArmstrong(n int) bool {
	sum := 0
	temp := n
	for temp > 0 {
		digit := temp % 10
		sum += digit * digit * digit
		temp /= 10
	}

	if sum != n {
		return false
	}

	return true
}

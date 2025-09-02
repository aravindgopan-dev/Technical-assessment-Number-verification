package services

import (
	"server/internals/modals"
	"server/pkg"
	"strconv"
)

func VerifyArmstrongNumber(n int, userIdInt int) bool {
	if !isArmstrong(n) {
		return false
	}

	record := &modals.Armstrong{
		Number: strconv.Itoa(n),
		UserID: uint(userIdInt),
	}

	return pkg.DB.Create(record).Error == nil
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

// VerifyArmstrongNumber returns true if the given number is an Armstrong number

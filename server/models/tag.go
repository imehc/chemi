package models

import (
	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	Name  string `json:"name" binding:"required,min=1,max=16"` // 长度限制
	State int    `json:"state" binding:"omitempty,oneof=0 1"`
}

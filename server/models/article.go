package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	TagID   uint   `json:"tag_id" gorm:"index"` // 用于声明这个字段为索引，如果你使用了自动迁移功能则会有所影响，在不使用则无影响
	Title   string `json:"title" binding:"required,min=2,max=30"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
	State   int    `json:"state" binding:"omitempty,oneof=0 1"`
}

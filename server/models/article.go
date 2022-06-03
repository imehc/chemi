package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	TagID   int    `json:"tag_id" gorm:"index"` // 用于声明这个字段为索引，如果你使用了自动迁移功能则会有所影响，在不使用则无影响
	Tag     Tag    `json:"tag"`
	Title   string `json:"title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
	State   int    `json:"state"`
}

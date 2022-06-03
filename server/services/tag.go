package services

import (
	"chemi/models"
	"time"
)

type Tag struct {
	ID        uint      `json:"id" gorm:"primarykey"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Name      string    `json:"name"`
	State     int64     `json:"state"`
}

func GetTags(pageNum, pageSize int) (tags []Tag) {
	db.Where("deleted_at is null").Offset(pageNum).Limit(pageSize).Find(&tags)
	return
}

func GetTagTotal() (count int64) {
	db.Model(&Tag{}).Where("deleted_at is null").Count(&count)
	return
}

func ExistTagByName(name string) bool {
	var tag models.Tag
	db.Select("id").Where("name = ?", name).First(&tag)
	if tag.ID > 0 {
		return true
	}
	return false
}

func AddTag(name string, state int64) bool {
	db.Create(&models.Tag{
		Name:  name,
		State: state,
	})
	err := db.AutoMigrate(&models.Tag{})
	if err != nil {
		return false
	}
	return true
}

func ExistTagByID(id int64) bool {
	var tag models.Tag
	db.Select("id").Where("id = ?", id).First(&tag)
	print(tag.ID)
	if tag.ID > 0 {
		return true
	}
	return false
}

func DeleteTag(id int64) bool {
	db.Where("id = ?", id).Delete(&models.Tag{})
	return true
}

func EditTag(id int64, data interface{}) bool {
	db.Model(&models.Tag{}).Where("id = ?", id).Updates(data)
	return true
}

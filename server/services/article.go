package services

import (
	"chemi/models"
	"time"
)

type article struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Tag       tag       `json:"tag" gorm:"foreignKey:TagID;association_foreignkey:TagID""`
	TagID     uint      `json:"-"` // 忽略返回类型
	Title     string    `json:"title"`
	Desc      string    `json:"desc"`
	Content   string    `json:"content"`
	State     int       `json:"state"`
}

func ExistArticleByID(id int) bool {
	var article article
	db.Select("id").Where("id = ?", id).First(&article)

	if article.ID > 0 {
		return true
	}

	return false
}

func GetArticleTotal(maps interface{}) (count int64) {
	db.Preload("Tag").Model(&article{}).Where("deleted_at is null").Count(&count)

	return
}

func GetArticles(pageNum int, pageSize int, maps interface{}) (articles []article) {
	db.Preload("Tag").Where(maps).Offset(pageNum).Limit(pageSize).Find(&articles)

	return
}

func GetArticle(id int) (article article) {
	db.Preload("Tag").Where("id = ?", id).First(&article)
	return
}

func EditArticle(id int, data interface{}) bool {
	db.Model(&models.Article{}).Where("id = ?", id).Updates(data)

	return true
}

func AddArticle(data map[string]interface{}) bool {
	db.Create(&models.Article{
		TagID:   data["tag_id"].(uint),
		Title:   data["title"].(string),
		Desc:    data["desc"].(string),
		Content: data["content"].(string),
		State:   data["state"].(int),
	})
	err := db.AutoMigrate(&models.Article{})
	if err != nil {
		return false
	}
	return true
}

func DeleteArticle(id int) bool {
	db.Where("id = ?", id).Delete(&models.Article{})
	return true
}

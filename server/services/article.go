package services

import (
	"chemi/models"
)

func ExistArticleByID(id int) bool {
	var article models.Article
	db.Select("id").Where("id = ?", id).First(&article)

	if article.ID > 0 {
		return true
	}

	return false
}

func GetArticleTotal(maps interface{}) (count int64) {
	db.Model(&models.Article{}).Where(maps).Count(&count)

	return
}

func GetArticles(pageNum int, pageSize int, maps interface{}) (articles []models.Article) {
	db.Preload("Tag").Where(maps).Offset(pageNum).Limit(pageSize).Find(&articles)

	return
}

func GetArticle(id int) (article models.Article) {
	db.Where("id = ?", id).First(&article)

	return
}

func EditArticle(id int, data interface{}) bool {
	db.Model(&models.Article{}).Where("id = ?", id).Updates(data)

	return true
}

func AddArticle(data map[string]interface{}) bool {
	db.Create(&models.Article{
		TagID:   data["tag_id"].(int),
		Title:   data["title"].(string),
		Desc:    data["desc"].(string),
		Content: data["content"].(string),
		State:   data["state"].(int),
	})
	err := db.AutoMigrate(&models.Tag{})
	if err != nil {
		return false
	}
	return true
}

func DeleteArticle(id int) bool {
	db.Where("id = ?", id).Delete(models.Article{})

	return true
}

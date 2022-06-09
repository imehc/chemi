package v1

import (
	"chemi/models"
	"chemi/pkg/app"
	"chemi/pkg/e"
	"chemi/pkg/setting"
	"chemi/pkg/utils"
	"chemi/services"
	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
	"net/http"
)

// GetArticle 获取单个文章
func GetArticle(c *gin.Context) {
	var (
		appG = app.Gin{C: c}
	)
	code := e.BAD_REQUEST
	id := com.StrTo(c.Param("id")).MustInt()
	ok := services.ExistArticleByID(id)
	if ok {
		article := services.GetArticle(id)
		code = e.SUCCESS
		appG.Response(http.StatusOK, code, article)
		return
	}
	code = e.ERROR_NOT_EXIST_ARTICLE
	appG.Response(http.StatusOK, code, nil)
}

// GetArticles 获取多个文章
func GetArticles(c *gin.Context) {
	var (
		appG = app.Gin{C: c}
	)
	maps := make(map[string]interface{})
	data := make(map[string]interface{})
	var state int64 = 1
	if arg := c.Query("state"); arg != "" {
		state = com.StrTo(arg).MustInt64()
		maps["state"] = state
	}
	code := e.SUCCESS
	data["lists"] = services.GetArticles(utils.GetPage(c), setting.AppSetting.PageSize, maps)
	data["total"] = services.GetArticleTotal(maps)
	appG.Response(http.StatusOK, code, data)
}

// AddArticle 新增文章
func AddArticle(c *gin.Context) {
	var (
		article models.Article
		appG    = app.Gin{C: c}
	)
	err, code := handleUpdateArticle(c, article, nil)
	if err != nil {
		appG.Response(http.StatusOK, code, nil)
		return
	}
	appG.Response(http.StatusCreated, code, nil)
}

// EditArticle 修改文章
func EditArticle(c *gin.Context) {
	var (
		article models.Article
		err     error
		appG    = app.Gin{C: c}
	)
	code := e.BAD_REQUEST
	id := com.StrTo(c.Param("id")).MustInt()
	ok := services.ExistArticleByID(int(id))
	if ok {
		err, code = handleUpdateArticle(c, article, id)
		if err != nil {
			return
		}
		appG.Response(http.StatusOK, code, nil)
		return
	}
	code = e.ERROR_NOT_EXIST_ARTICLE
	appG.Response(http.StatusOK, code, nil)
}

// DeleteArticle 删除文章
func DeleteArticle(c *gin.Context) {
	var (
		appG = app.Gin{C: c}
	)
	code := e.BAD_REQUEST
	id := com.StrTo(c.Param("id")).MustInt()
	ok := services.ExistArticleByID(int(id))
	if ok {
		ok := services.DeleteArticle(int(id))
		if ok {
			code = e.DELETED
			appG.Response(http.StatusNoContent, code, nil)
			return
		}
		code = e.ERROR_DELETE_ARTICLE_FAIL
		appG.Response(http.StatusInternalServerError, code, nil)
		return
	}
	code = e.ERROR_NOT_EXIST_ARTICLE
	appG.Response(http.StatusInternalServerError, code, nil)
}

func handleUpdateArticle(c *gin.Context, article models.Article, other interface{}) (err error, code int) {

	code = e.BAD_REQUEST

	if err := c.ShouldBindJSON(&article); err != nil {
		return err, code
	}
	if services.ExistTagByID(article.TagID) {
		data := make(map[string]interface{})
		data["tag_id"] = article.TagID
		data["title"] = article.Title
		data["desc"] = article.Desc
		data["content"] = article.Content
		data["state"] = article.State
		var article bool
		if other != nil {
			article = services.EditArticle(other.(int), data)
		} else {
			article = services.AddArticle(data)
		}
		if article {
			code = e.SUCCESS
		} else {
			code = e.ERROR
		}
	} else {
		code = e.ERROR_NOT_EXIST_TAG
	}
	return nil, code
}

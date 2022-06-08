package v1

import (
	"chemi/models"
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
	code := e.BAD_REQUEST
	id := com.StrTo(c.Param("id")).MustInt()
	ok := services.ExistArticleByID(id)
	if ok {
		article := services.GetArticle(id)
		code = e.SUCCESS
		c.JSON(http.StatusOK, gin.H{
			"code": code,
			"msg":  e.GetMsg(code),
			"data": article,
		})
		return
	}
	code = e.ERROR_NOT_EXIST_ARTICLE
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": "",
	})
}

// GetArticles 获取多个文章
func GetArticles(c *gin.Context) {
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

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}

// AddArticle 新增文章
func AddArticle(c *gin.Context) {
	var (
		article models.Article
	)
	err, code := handleUpdateArticle(c, article, nil)
	if err != nil {
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]interface{}),
	})
}

// EditArticle 修改文章
func EditArticle(c *gin.Context) {
	var (
		article models.Article
		err     error
	)
	code := e.BAD_REQUEST
	id := com.StrTo(c.Param("id")).MustInt()
	ok := services.ExistArticleByID(id)
	if ok {
		err, code = handleUpdateArticle(c, article, id)
		if err != nil {
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"code": code,
			"msg":  e.GetMsg(code),
			"data": make(map[string]interface{}),
		})
		return
	}
	code = e.ERROR_NOT_EXIST_ARTICLE
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": "",
	})
}

// DeleteArticle 删除文章
func DeleteArticle(c *gin.Context) {
	code := e.BAD_REQUEST
	id := com.StrTo(c.Param("id")).MustInt()
	ok := services.ExistArticleByID(id)
	if ok {
		ok := services.DeleteArticle(id)
		if ok {
			code = e.DELETED
			c.JSON(http.StatusNoContent, gin.H{
				"code": code,
				"msg":  e.GetMsg(code),
				"data": "",
			})
			return
		}
		code = e.ERROR_DELETE_ARTICLE_FAIL
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": code,
			"msg":  e.GetMsg(code),
			"data": "",
		})
		return
	}
	code = e.ERROR_NOT_EXIST_ARTICLE
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": "",
	})
}

func handleUpdateArticle(c *gin.Context, article models.Article, other interface{}) (err error, code int) {

	code = e.BAD_REQUEST

	if err := c.ShouldBindJSON(&article); err != nil {
		return err, code
	}
	if services.ExistTagByID(int64(article.TagID)) {
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

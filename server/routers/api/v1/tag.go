package v1

import (
	"chemi/models"
	"chemi/pkg/e"
	"chemi/pkg/setting"
	"chemi/pkg/utils"
	"chemi/services"
	"github.com/astaxie/beego/validation"
	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
	"net/http"
)

// GetTags 获取多个文章标签
func GetTags(c *gin.Context) {
	// c.Query可用于获取?name=test&state=1这类 URL 参数，而c.DefaultQuery则支持设置一个默认值
	name := c.Query("name")
	maps := make(map[string]interface{})
	data := make(map[string]interface{})
	if name != "" {
		maps["name"] = name
	}
	var state int64 = 1
	if arg := c.Query("state"); arg != "" {
		state = com.StrTo(arg).MustInt64()
		maps["state"] = state
	}
	code := e.SUCCESS
	data["lists"] = services.GetTags(utils.GetPage(c), setting.AppSetting.PageSize)
	data["total"] = services.GetTagTotal()

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}

// AddTag 新增文章标签
func AddTag(c *gin.Context) {
	var (
		tag models.Tag
	)
	code := e.BAD_REQUEST

	if err := c.ShouldBindJSON(&tag); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": code,
			"msg":  e.GetMsg(code),
			"data": err.Error(),
		})
		return
	}
	if !services.ExistTagByName(tag.Name) {
		result := services.AddTag(tag.Name, tag.State)
		if result {
			code = e.SUCCESS

			c.JSON(http.StatusOK, gin.H{
				"code": code,
				"msg":  e.GetMsg(code),
				"data": make(map[string]string),
			})
		} else {
			code = e.ERROR
			c.JSON(http.StatusOK, gin.H{
				"code": code,
				"msg":  e.GetMsg(code),
				"data": make(map[string]string),
			})
		}
		return
	}
	code = e.NOT_FOUND
	c.JSON(http.StatusBadRequest, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]string),
	})
}

// EditTag 修改文章标签
func EditTag(c *gin.Context) {
	var (
		tag models.Tag
	)
	id := com.StrTo(c.Param("id")).MustInt64()
	code := e.BAD_REQUEST
	if err := c.ShouldBindJSON(&tag); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": code,
			"msg":  e.GetMsg(code),
			"data": err.Error(),
		})
		return
	}
	// 使用map解决gorm (0、““、false等) 不参与更新问题
	data := make(map[string]interface{})
	if services.ExistTagByID(id) {
		if !services.ExistTagByName(tag.Name) {
			data["name"] = tag.Name
			data["state"] = tag.State
			code = e.SUCCESS
			services.EditTag(id, data)
		} else {
			code = e.ERROR_EXIST_TAG
		}
	} else {
		code = e.ERROR_NOT_EXIST_TAG
	}
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]string),
	})
}

// DeleteTag 删除文章标签
func DeleteTag(c *gin.Context) {
	id := com.StrTo(c.Param("id")).MustInt64()

	valid := validation.Validation{}
	valid.Min(id, 1, "id").Message("ID必须大于0")

	code := e.BAD_REQUEST
	if !valid.HasErrors() {
		code = e.SUCCESS
		if services.ExistTagByID(id) {
			services.DeleteTag(id)
		} else {
			code = e.ERROR_NOT_EXIST_TAG
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]string),
	})
}

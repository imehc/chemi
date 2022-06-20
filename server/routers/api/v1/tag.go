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

// GetTags 获取多个文章标签
func GetTags(c *gin.Context) {
	var (
		appG = app.Gin{C: c}
	)
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

	appG.Response(http.StatusOK, code, data)
}

// AddTag 新增文章标签
func AddTag(c *gin.Context) {
	var (
		tag  models.Tag
		appG = app.Gin{C: c}
	)
	code := e.BAD_REQUEST

	if err := c.ShouldBindJSON(&tag); err != nil {
		appG.Response(http.StatusBadRequest, code, err.Error())
		return
	}
	if !services.ExistTagByName(tag.Name) {
		result := services.AddTag(tag.Name, tag.State)
		if result {
			code = e.CREATED
			appG.Response(http.StatusCreated, code, nil)
		} else {
			code = e.ERROR
			appG.Response(http.StatusInternalServerError, code, nil)
		}
		return
	}
	code = e.ERROR_EXIST_TAG
	appG.Response(http.StatusOK, code, nil)
}

// EditTag 修改文章标签
func EditTag(c *gin.Context) {
	var (
		tag  models.Tag
		appG = app.Gin{C: c}
	)
	id := com.StrTo(c.Param("id")).MustInt()
	code := e.BAD_REQUEST
	if err := c.ShouldBindJSON(&tag); err != nil {
		appG.Response(http.StatusBadRequest, code, err.Error())
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
	appG.Response(http.StatusOK, code, nil)
}

// DeleteTag 删除文章标签
func DeleteTag(c *gin.Context) {
	var (
		appG = app.Gin{C: c}
	)
	id := com.StrTo(c.Param("id")).MustInt()

	//valid := validation.Validation{}
	//valid.Min(id, 1, "id").Message("ID必须大于0")

	code := e.BAD_REQUEST
	//if !valid.HasErrors() {
	code = e.DELETED
	if services.ExistTagByID(id) {
		services.DeleteTag(id)
		appG.Response(http.StatusNoContent, code, nil)
		return
	} else {
		code = e.ERROR_NOT_EXIST_TAG
		appG.Response(http.StatusInternalServerError, code, nil)
	}
	//}

}

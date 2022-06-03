package e

var msgFlags = map[int]string{
	SUCCESS:          "成功",
	CREATED:          "创建成功",
	DELETED:          "删除成功",
	BAD_REQUEST:      "参数错误",
	UNAUTHORIZED:     "已过期",
	REFUSED:          "请求被拒绝",
	NOT_FOUND:        "访问出错",
	MethodNotAllowed: "HTTP方法错误",
	ERROR:            "服务器异常",

	ERROR_EXIST_TAG:                "已存在该标签名称",
	ERROR_NOT_EXIST_TAG:            "该标签不存在",
	ERROR_NOT_EXIST_ARTICLE:        "该文章不存在",
	ERROR_AUTH_CHECK_TOKEN_FAIL:    "Token鉴权失败",
	ERROR_AUTH_CHECK_TOKEN_TIMEOUT: "Token已超时",
	ERROR_AUTH_TOKEN:               "Token生成失败",
	ERROR_AUTH:                     "Token错误",
}

// GetMsg get error information based on Code
func GetMsg(code int) string {
	msg, ok := msgFlags[code]
	if ok {
		return msg
	}

	return msgFlags[ERROR]
}

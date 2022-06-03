package e

const (
	SUCCESS          = 200
	CREATED          = 201
	DELETED          = 204
	BAD_REQUEST      = 400
	UNAUTHORIZED     = 401
	REFUSED          = 403
	NOT_FOUND        = 404
	MethodNotAllowed = 405
	ERROR            = 500

	ERROR_EXIST_TAG         = 10001
	ERROR_NOT_EXIST_TAG     = 10002
	ERROR_NOT_EXIST_ARTICLE = 10003

	ERROR_AUTH_CHECK_TOKEN_FAIL    = 20001
	ERROR_AUTH_CHECK_TOKEN_TIMEOUT = 20002
	ERROR_AUTH_TOKEN               = 20003
	ERROR_AUTH                     = 20004
)

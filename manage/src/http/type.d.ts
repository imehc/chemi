enum EHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/**
 * @description: 声明请求头header的类型
 */
interface IHeaderConfig {
  // Accept?: string;
  // 'Content-Type': string;
  [propName: string]: any;
}
interface IResponseData {
  code: number;
  data: any;
  message: string;
}

interface IAnyMap {
  [propName: string]: any;
}

type ICustomRequestError = {
  status: number;
  statusText: string;
  url: string;
}

interface IRequestOptions {
  headers?: IHeaderConfig;
  signal?: AbortSignal;
  method?: EHttpMethods;
  query?: IAnyMap;
  params?: IAnyMap;
  data?: IAnyMap;
  body?: string;
  timeout?: number;
  credentials?: 'include' | 'same-origin';
  mode?: 'cors' | 'same-origin';
  cache?: 'no-cache' | 'default' | 'force-cache';
}

/**
  * Http request
  * @param url request URL
  * @param options request options
  */
declare interface IHttpInterface {
  request<T = IResponseData>(url: string, options?: IRequestOptions): Promise<T>;
}




// query 格式化的插件
import qs from 'query-string';
import fetch from 'isomorphic-unfetch';

const CAN_SEND_METHOD = ['POST', 'PUT', 'PATCH', 'DELETE'];

const BASE_URL = 'https://v1.hitokoto.cn';

class Http implements IHttpInterface {
  protected static base_url = BASE_URL
  public async request<T>(
    url: string,
    options?: IRequestOptions,
    abortController?: AbortController
  ): Promise<T> {

    const opts: IRequestOptions = Object.assign({
      method: 'GET',
      headers: {},
      credentials: 'include', // 证书
      timeout: 5000, // 超时
      mode: 'cors', // 模式
      cache: 'no-cache', // 缓存
    }, options);

    abortController && (opts.signal = abortController.signal)

    if (opts?.query) {
      url += `${url.includes('?') ? '&' : '?'}${qs.stringify(
        filterObject(opts.query, Boolean),
      )}`;
    }

    const canSend = opts?.method && CAN_SEND_METHOD.includes(opts.method);

    if (canSend && opts.data) {
      opts.body = JSON.stringify(filterObject(opts.data, Boolean));
      opts.headers && Reflect.set(opts.headers, 'Content-Type', 'application/json');
    }
    console.log('Request Opts: ', opts);

    try {
      const res = await Promise.race([
        fetch(Http.base_url + url, opts),
        new Promise<any>((_, reject) => {
          setTimeout(() => {
            return reject({ status: 408, statusText: '请求超时，请稍后重试', url });
          }, opts.timeout);
        }),
      ]);
      const result = await res.json();
      return result;
    } catch (error: any) {
      dealErrToast(error, abortController);
      return error;
    }

  }
}

const filterObject = (o: Record<string, string>, filter: Function) => {
  const res: Record<string, string> = {};
  Object.keys(o).forEach(k => {
    if (filter(o[k], k)) {
      res[k] = o[k];
    }
  });
  return res;
};

/**
 * 错误处理
 * @param err 
 * @param abortController 
 */
function dealErrToast(err: Error & ICustomRequestError, abortController?: AbortController) {
  switch (err.status) {
    case 408: {
      abortController?.abort();
      (typeof window !== 'undefined') && console.error(err.statusText);
      break;
    }
    default: {
      console.log(err);
      break;
    }
  }
}

const { request } = new Http();

export { request as default };

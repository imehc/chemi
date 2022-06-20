// query 格式化的插件
import qs from 'query-string';
import { useStorage } from '~/hooks';

const { getAccessToken } = useStorage();

const BASE_URL = 'http://api.openapi-generator.tech';

const Method = ['GET', 'POST', 'PUT', 'DELETE'];

let headers = {
  'Content-Type': 'application/json',
};

type ConfigProps = { [key: string]: any };

const fetchRequest = (
  url: string = '',
  data: ConfigProps = {},
  method: string = 'GET',
  isBlob: boolean = false,
  header: ConfigProps = {}
) => {
  method = Method.includes(method.toUpperCase()) ? method.toUpperCase() : 'GET';
  url = url.startsWith('/') ? `${BASE_URL}${url}` : `${BASE_URL}/${url}`;
  header = { ...headers, ...header };

  let config: RequestInit = {
    method,
    headers: header,
  };

  if (getAccessToken() !== null) {
    header['Authorization'] = `Bearer ${getAccessToken()}`;
  }

  if (method === 'GET') {
    url =
      url.indexOf('?') === -1
        ? `${url}?${qs.stringify(data)}`
        : `${url}&${qs.stringify(data)}`;
  }
  if (method === 'POST' || method === 'PUT') {
    if (data) {
      config = {
        ...config,
        body: JSON.stringify(data),
      };
    }
  }
  return sendFetchRequest(url, config, isBlob);
};

const fetchUpload = () => {
  const formData = new FormData();
  // formData.append()
};

const sendFetchRequest = (
  url: string,
  config: RequestInit,
  isBlob: boolean
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, config);
      if (response.ok) {
        if (response.status >= 200 && response.status < 300) {
          if (isBlob) {
            resolve(response.blob());
          } else {
            resolve(response.json());
          }
        } else {
          reject(response.statusText);
        }
      } else {
        reject(response.status);
      }
    } catch (e) {
      reject(e);
    }
  });
};
export { fetchRequest };

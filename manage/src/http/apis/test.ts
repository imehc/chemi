import request from '~/http/http';

export const testGetFetch = () => {
  return request('/apis', {
    query: {
      c: 'd',
    },
  }, new AbortController);
}
export const testPostFetch = () => {
  return request('/apis/gen/clients', {
    data: {
      langauge: 'py-script'
    },
  }, new AbortController);
}

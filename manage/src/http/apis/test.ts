import { fetchRequest } from '~/http/http';

export const testGetFetch = () => {
  return fetchRequest('/api/gen/clients', {
    name: 'test',
    age: 18
  });
}
export const testPostFetch = () => {
  return fetchRequest('/api/gen/clients', {
    langauge: 'py-script'
  }, 'POST');
}

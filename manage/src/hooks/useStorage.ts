const AccessToken = 'ACCESS_TOKEN';
// const RefreshToken = 'REFRESH_TOKEN';

const setAccessToken = (token: string, session: boolean = false) => {
  session ? sessionStorage.setItem(AccessToken, token) : localStorage.setItem(AccessToken, token);
}
const getAccessToken = (session: boolean = false) => {
  return session ? sessionStorage.getItem(AccessToken) : localStorage.getItem(AccessToken);
}
const removeAccessToken = (session: boolean = false) => {
  session ? sessionStorage.removeItem(AccessToken) : localStorage.removeItem(AccessToken);
}
const set = (key: string, value: string, session: boolean = false) => {
  session ? sessionStorage.setItem(key, value) : localStorage.setItem(key, value);
}
const get = (key: string, session: boolean = false) => {
  return session ? sessionStorage.getItem(key) : localStorage.getItem(key);
}
const remove = (key: string, session: boolean = false) => {
  session ? sessionStorage.removeItem(key) : localStorage.removeItem(key);
}
const clear = (session: boolean = false) => {
  session ? sessionStorage.clear() : localStorage.clear();
}

export const useStorage = () => {
  return {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    set,
    get,
    remove,
    clear
  }
}
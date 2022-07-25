const AccessToken = 'ACCESS_TOKEN';
// const RefreshToken = 'REFRESH_TOKEN';

const session = window.sessionStorage ?? sessionStorage;
const local = window.localStorage ?? localStorage;

const setAccessToken = (token: string, isSession: boolean = false) => {
  isSession ? session.setItem(AccessToken, token) : local.setItem(AccessToken, token);
}
const getAccessToken = (isSession: boolean = false) => {
  return isSession ? session.getItem(AccessToken) : local.getItem(AccessToken);
}
const removeAccessToken = (isSession: boolean = false) => {
  isSession ? session.removeItem(AccessToken) : local.removeItem(AccessToken);
}
const set = (key: string, value: string, isSession: boolean = false) => {
  isSession ? session.setItem(key, value) : local.setItem(key, value);
}
const get = (key: string, isSession: boolean = false) => {
  return isSession ? session.getItem(key) : local.getItem(key);
}
const remove = (key: string, isSession: boolean = false) => {
  isSession ? session.removeItem(key) : local.removeItem(key);
}
const clear = (isSession: boolean = false) => {
  isSession ? session.clear() : local.clear();
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
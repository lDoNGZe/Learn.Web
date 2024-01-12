import Cookies from "js-cookie";

const TokenKey = "token";

export function getToken() {
  return Cookies.get(TokenKey);
}
export function setToken(token, second) {
  const time = new Date(new Date().getTime() + second * 1000);
  return Cookies.set(TokenKey, token, { expires: time });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setDiyToken(key, val) {
  return Cookies.set(key, val);
}

export function getDiyToken(key) {
  return Cookies.get(key);
}

export function removeDiyToken(key) {
  return Cookies.remove(key);
}

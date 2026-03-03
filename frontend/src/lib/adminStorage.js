const ADMIN_TOKEN_KEY = "admin_token";

export const adminStorage = {
  getToken() {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  },
  setToken(token) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  },
  clearToken() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  },
  hasToken() {
    return Boolean(localStorage.getItem(ADMIN_TOKEN_KEY));
  },
};

export { ADMIN_TOKEN_KEY };

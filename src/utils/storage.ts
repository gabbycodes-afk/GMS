
const AUTH_KEY = "gms_auth_token";
const USER_KEY = "gms_user";

export interface AuthUser {
  username: string;
  email: string;
}

export const storage = {
  getToken: (): string | null => {
    return localStorage.getItem(AUTH_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(AUTH_KEY, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getUser: (): AuthUser | null => {
    const user = localStorage.getItem(USER_KEY);

    if (!user) return null;

    try {
      return JSON.parse(user) as AuthUser;
    } catch {
      return null;
    }
  },

  setUser: (user: AuthUser): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
};


import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { storage, type AuthUser } from "../utils/storage";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    return storage.getToken() ? storage.getUser() : null;
  });

  const login = async (email: string, password: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (email !== "admin@gms.com" || password !== "GameAdmin123") {
      throw new Error("Invalid email or password.");
    }

    const authenticatedUser: AuthUser = {
      username: "Game Admin",
      email,
    };

    storage.setToken(crypto.randomUUID());
    storage.setUser(authenticatedUser);
    setUser(authenticatedUser);
  };

  const logout = () => {
    storage.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user && storage.getToken()),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

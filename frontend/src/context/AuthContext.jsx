import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "../utils/token";
import { getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await getCurrentUser();
        setAuthUser(user);
      } catch (error) {
        removeToken();
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = ({ token, user }) => {
    setToken(token);
    setAuthUser(user);
  };

  const logout = () => {
    removeToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  // login: guarda token y usuario en contexto
  const login = (data, email) => {
    setUser({ token: data.access_token, username: email });
    localStorage.setItem("token", data.access_token);
  };

  // logout: limpia sesión
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// HOOK para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}

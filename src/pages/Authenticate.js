import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
const AuthenticateContex = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => {
    if (user === "User") {
      setUser(user);
    }
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthenticateContex.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticateContex.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthenticateContex);
};

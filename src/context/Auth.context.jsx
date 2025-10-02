import { createContext, useState, useEffect, useContext } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // VERIFY
  const verify = async (token) => {
    if (!token) {
      setUser(null);
      localStorage.removeItem("authToken");
      return;
    }
    try {
      const response = await api.get("/auth/verify");
      if (response.status === 200) {
        setUser(response.data.payload);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // SIGNUP
  const signup = async (body, setToggle, e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", body);

      if (response.status === 201 || response.status === 200) {
        setToggle((prev) => !prev);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // LOGIN
  const login = async (body, e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", body);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("authToken", response.data.authToken);
        verify(response.data.authToken);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  // Carregar user se já existir token salvo
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    verify(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context must be used inside a provider");
  }
  return context;
};

export default AuthProvider;

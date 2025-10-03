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
      const response = await api.get("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUser(response.data.payload); //username and email
      }
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
        localStorage.setItem("authToken", response.data.authToken);

        setUser(response.data.payload);

        verify(response.data.authToken);

        setToggle((prev) => !prev);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // LOGIN
  const login = async (body, e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", body);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("authToken", response.data.authToken);

        setUser(response.data.payload);

        verify(response.data.authToken);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //DELETE
  const deleteAccount = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        logout();
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    verify(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, signup, logout, deleteAccount }}
    >
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

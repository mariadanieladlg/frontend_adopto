import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // LOGIN
  const login = async (body, e) => {
    e.preventDefault();
    const result = await signin(body);
    if (result.ok) {
      setUser(result.user); // <- agora atualiza corretamente
      return true;
    }
    return false;
  };

  // REGISTER
  const signup = async (body, e) => {
    e.preventDefault();
    const result = await register(body);
    if (result.ok) {
      return true; // no cadastro, não faz login automático
    }
    return false;
  };

  // LOGOUT
  const signout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

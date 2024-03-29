import { createContext, useEffect, useState } from "react";
import Axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input) => {
    const res = await Axios.post("/api/auth/login", input);
    setCurrentUser(res.data);
  };
  const logout = async () => {
    await Axios.post("/api/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };

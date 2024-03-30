import { createContext, useEffect, useState } from "react";
import { Base_URL } from "../../../src/utils/globalConstantUtil";
import Axios from "axios";

Axios.defaults.withCredentials = true;

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input) => {
    const res = await Axios.post(`${Base_URL}/api/login`, input);
    console.log(res.data);
    setCurrentUser(res.data);
  };
  const logout = async () => {
    await Axios.post(`${Base_URL}}/api/auth/logout`);
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

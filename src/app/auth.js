import axios from "axios";
import { AuthContext } from "../features/user/auth";
import { Token } from "@mui/icons-material";
import { useContext } from "react";

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
  const TOKEN = localStorage.getItem("user");
  console.log(TOKEN);
  const PUBLIC_ROUTES = [
    "login",
    "forgot-password",
    "register",
    "documentation",
  ];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  if (TOKEN === "null" && !isPublicPage) {
    return (window.location.href = "/login");
  } else {
    return TOKEN;
  }
};

export default checkAuth;

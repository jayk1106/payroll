import authContext from "./authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [organizationId, setOrganizationId] = useState(
    localStorage.getItem("organizationId")
      ? localStorage.getItem("organizationId")
      : null
  );

  const navigate = useNavigate();

  const login = (token, organizationId = null, redirectUrl = "/dashboard") => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    localStorage.setItem("organizationId", organizationId);
    setOrganizationId(organizationId);

    if (!organizationId) {
      return navigate("/create-organization");
    }
    navigate(redirectUrl);
  };

  const setOrganization = (orgId) => {
    localStorage.setItem("organizationId", orgId);
    setOrganizationId(orgId);

    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setOrganizationId(null);
    navigate("/login");
  };
  return (
    <authContext.Provider
      value={{ isLoggedIn, organizationId, login, logout, setOrganization }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;

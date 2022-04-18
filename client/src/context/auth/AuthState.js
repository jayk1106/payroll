import authContext from "./authContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [isAdmin, setIsAdmin] = useState(false);

  const [organizationId, setOrganizationId] = useState(
    localStorage.getItem("organizationId")
      ? localStorage.getItem("organizationId")
      : null
  );

  const navigate = useNavigate();

  const getAdminStatus = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/general/admin-status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const result = await res.json();
      setIsAdmin(result.isAdmin);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) getAdminStatus();
  }, [isLoggedIn]);

  const login = (token, orgId = null, redirectUrl = "/dashboard") => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    localStorage.setItem("organizationId", orgId);
    setOrganizationId(orgId);

    if (!orgId) {
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
      value={{
        isLoggedIn,
        organizationId,
        login,
        logout,
        setOrganization,
        isAdmin,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;

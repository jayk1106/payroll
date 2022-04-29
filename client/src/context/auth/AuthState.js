import authContext from "./authContext";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthState = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );

  const [organizationId, setOrganizationId] = useState(

    localStorage.getItem('organizationId')
      ? localStorage.getItem('organizationId')
      : null
  );

  const [id, setId] = useState(localStorage.getItem('id') || null);

  const [isAdmin, setIsAdmin] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const navigate = useNavigate();


  async function getAdminStatus() {
    if (isLoggedIn) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/general/admin-status`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const result = await res.json();
        setIsAdmin(result.isAdmin);
        setIsUser(result.isUser);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useLayoutEffect(() => {
    if (isLoggedIn) getAdminStatus();
  }, [isLoggedIn]);

  const login = (
    token,
    orgId = null,
    id = null,
    redirectUrl = '/dashboard'
  ) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);

    localStorage.setItem('organizationId', orgId);
    setOrganizationId(orgId);

    localStorage.setItem('id', id);
    setId(id);

    if (!orgId) {
      return navigate('/create-organization');
    }
    navigate(redirectUrl);
  };

  const setOrganization = (orgId) => {
    localStorage.setItem('organizationId', orgId);
    setOrganizationId(orgId);

    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setOrganizationId(null);
    navigate('/login');
  };
  return (
    <authContext.Provider
      value={{
        id,
        isLoggedIn,
        organizationId,
        login,
        logout,
        setOrganization,
        isAdmin,
        isUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;

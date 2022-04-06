import authContext from "./authContext";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthState = (props) => {
    const [isLoggedIn , setIsLoggedIn] = useState( localStorage.getItem('token') ? true : false );
    const navigate = useNavigate();

    const login = (token , redirectUrl = '/dashboard') => {
        localStorage.setItem('token' , token);
        setIsLoggedIn(true);
        navigate(redirectUrl);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    }
    return(
        <authContext.Provider value={ { isLoggedIn , login, logout} }>
            {props.children}
        </authContext.Provider>
    )
} 
export default AuthState;
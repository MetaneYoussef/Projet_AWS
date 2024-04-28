import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToken, removeToken, getToken, getUserDetails } from '../Services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const navigate = useNavigate();

export const useAuth = () => useContext(AuthContext);
 
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = getToken();
        if (token) {
            const userDetails = getUserDetails(token);
            if (userDetails) {
                setUser(userDetails);
                setIsAuthenticated(true);
            }
        }
    }, []);

    const login = (token) => {
        saveToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setUser(null);
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
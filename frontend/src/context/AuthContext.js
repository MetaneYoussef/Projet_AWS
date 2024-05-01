import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToken, removeToken, getToken, getUserDetails } from '../Services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
 
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getToken());  // Ajout de cette ligne

    useEffect(() => {
        const token = getToken();
        if (token) {
            const userDetails = getUserDetails(token);
            if (userDetails) {
                setUser(userDetails);
                setIsAuthenticated(true);
            }
        }
    }, [token]);

    const login = (token) => {
        saveToken(token);
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setToken(null); 
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
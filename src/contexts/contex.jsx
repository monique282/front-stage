import React from 'react';
import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
    const [admin, setAdmin] = useState(false)
    const login = (token, userData) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{
            authToken, setAuthToken,
            login,
            logout,
            admin, setAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

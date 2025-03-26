import React from 'react';
import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
   
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
    const [admin, setAdmin] = useState(() => {
        const storedAdmin = localStorage.getItem("admin");
        return storedAdmin ? JSON.parse(storedAdmin) : false;
    });
    const updateAdmin = (value) => {
        localStorage.setItem("admin", JSON.stringify(value));
        setAdmin(value);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("admin");
        setAuthToken(null);
        setAdmin(false);
    };

    return (
        <AuthContext.Provider value={{
            authToken, setAuthToken,
            logout, updateAdmin,
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

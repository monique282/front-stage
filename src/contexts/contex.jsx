import React from 'react';
import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(() => { return localStorage.getItem("authToken")});   

    return (
        <AuthContext.Provider value={{ 
            authToken, setAuthToken,
             }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

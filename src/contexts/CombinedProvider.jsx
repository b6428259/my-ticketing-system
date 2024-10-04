// src/contexts/CombinedProvider.jsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { TicketProvider } from './TicketContext';

const CombinedProvider = ({ children }) => {
    return (
        <AuthProvider>
            <TicketProvider>
                {children}
            </TicketProvider>
        </AuthProvider>
    );
};

export default CombinedProvider;

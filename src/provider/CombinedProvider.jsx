import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { TicketProvider } from '../contexts/TicketContext';
import { ConcertProvider } from '../contexts/ConcertContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useParams } from 'react-router-dom';

const CombinedProvider = ({ children }) => {
    const { concertId } = useParams(); // Extract concertId from the URL params

    return (
        <AuthProvider>
            <TicketProvider>
                <ConcertProvider concertId={concertId}>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </ConcertProvider>
            </TicketProvider>
        </AuthProvider>

    );
};

export default CombinedProvider;

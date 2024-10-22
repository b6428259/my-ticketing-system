import React from 'react';
import { useParams } from 'react-router-dom';
import CombinedProvider from './CombinedProvider';

const ProviderWrapper = ({ children }) => {
    const { concertId } = useParams(); // Extract concertId from URL parameters

    return (
        <CombinedProvider concertId={concertId}> {/* Pass concertId to CombinedProvider */}
            {children}
        </CombinedProvider>
    );
};

export default ProviderWrapper;

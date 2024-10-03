import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; 
import PleaseAuth from '../../components/Modals/PleaseAuth'; 

const Reserve = () => {
    const { isAuthenticated } = useContext(AuthContext); // Get authentication status
    const [isAuthModalOpen, setAuthModalOpen] = useState(false); // State to control PleaseAuth modal

    useEffect(() => {
        // Open PleaseAuth modal if user is not authenticated
        if (!isAuthenticated) {
            setAuthModalOpen(true);
        }
    }, [isAuthenticated]); // Effect runs when isAuthenticated changes

    const closeAuthModal = () => {
        setAuthModalOpen(false); // Function to close the modal
    };

    return (
        <>
            {/* Show PleaseAuth modal if user is not authenticated */}
            <PleaseAuth isOpen={isAuthModalOpen} onClose={closeAuthModal} />

            <div>
                <h1>Reserve Page</h1>
                <p>Welcome to the reservation page. Please fill out the form below to reserve your tickets.</p>
                {/* Add your reservation form here */}
            </div>
        </>
    );
};

export default Reserve;

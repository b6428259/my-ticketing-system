// TicketContext.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const TicketContext = createContext();

export const useTicket = () => {
    return useContext(TicketContext);
};

export const TicketProvider = ({ children }) => {
    const [responseMessage, setResponseMessage] = useState('');
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(false);  // Loading state for fetching ticket details
    const [scanning, setScanning] = useState(false); // Loading state for scanning tickets
    const [error, setError] = useState(null);

    const ip = 'https://api.spotup.shop/api/v1';

    const fetchTicketDetail = async (id) => {
        setLoading(true); // Set loading state for ticket fetching
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found. Please log in again.');
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${ip}/tickets/${id}`);
          
            setTicket(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching ticket:', error);
            if (error.response && error.response.status === 401) {
                // Unauthorized, token might be expired
                localStorage.removeItem('token');
                setError('Session expired. Please log in again.');
                setTicket(null);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false); // Reset loading state after fetching
        }
    };
    

    const handleScan = async (ticketCode) => {
        if (scanning) return; // Prevent running if already scanning
        setScanning(true);  // Set scanning state to true
        setResponseMessage('');
        setError('');
    
        try {
            const token = localStorage.getItem('token'); // Get the token from local storage
            if (!token) {
                throw new Error('No token found. Please log in again.');
            }
            const response = await axios.post(`${ip}/tickets/scan`, {
                ticketCode
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setResponseMessage(response.data); // Set response message to show success
            setError(null);
        } catch (error) {
            console.error('Error scanning ticket:', error);
            if (error.response && error.response.status === 401) {
                // Unauthorized, token might be expired
                localStorage.removeItem('token');
                setError('Session expired. Please log in again.');
            } else {
                setError(error.response ? error.response.data : 'An error occurred');
            }
        } finally {
            setScanning(false); // Always reset scanning state at the end
        }
    };

    const purchaseTickets = async (cart) => {
        setLoading(true); // Set loading state for ticket purchasing
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in again.');
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Loop through cart items to purchase each one
            for (const item of cart) {
                const response = await axios.post(`${ip}/tickets/purchase`, {
                    userId: item.userId,  // Assuming userId is in the cart items
                    productId: item.productId,
                    quantity: item.quantity  // Add quantity if applicable
                });
                setResponseMessage(prevMessage => `${prevMessage}\n${response.data.message}`);
            }

            setError(null);
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                setError('Session expired. Please log in again.');
            } else {
                setError(error.response ? error.response.data.message : 'An error occurred during purchase.');
            }
        } finally {
            setLoading(false); // Reset loading state after purchase attempt
        }
    };

    return (
        <TicketContext.Provider value={{
            ticket,
            loading,          // Loading state for fetching ticket details
            scanning,         // Loading state for scanning tickets
            error,
            fetchTicketDetail,
            handleScan,
            responseMessage,
            purchaseTickets,  // Expose purchaseTickets method
        }}>
            {loading && <div>Loading ticket details...</div>}
            {scanning && <div>Scanning ticket...</div>}
            {children}
        </TicketContext.Provider>
    );
    
};

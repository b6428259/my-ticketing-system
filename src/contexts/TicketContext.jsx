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

    // Fetch ticket details
    const fetchTicketDetail = async (id) => {
        setLoading(true); // Set loading state for ticket fetching
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/tickets/${id}/detail`);
            setTicket(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching ticket:', error);
            setError(error.message);
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
            const response = await axios.post(
                'http://localhost:8080/api/v1/tickets/scan',
                { ticketCode }, // Sending ticketCode in the request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in headers for authentication
                    },
                }
            );

            setResponseMessage(response.data); // Set response message to show success
        } catch (error) {
            console.error('Error scanning ticket:', error);
            setError(error.response ? error.response.data : 'An error occurred'); // Handle error
        } finally {
            setScanning(false); // Always reset scanning state at the end
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
            responseMessage
        }}>
            {children}
        </TicketContext.Provider>
    );
};

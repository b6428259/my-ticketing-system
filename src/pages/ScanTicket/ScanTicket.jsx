// src/pages/ScanTicket/ScanTicket.jsx
import React, { useState } from 'react';
import { useTicket } from '../../contexts/TicketContext'; // Import the TicketContext

const ScanTicket = () => {
    const [ticketCode, setTicketCode] = useState('');
    const { handleScan, responseMessage, error, loading } = useTicket(); // Destructure from context

    // Ensure the form submission triggers handleScan
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        handleScan(ticketCode); // Call handleScan from context
        setTicketCode(''); // Clear the input after submitting (optional)
    };

    return (
        <div>
            <h1>Scan Your Ticket</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Ticket Code"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Scanning...' : 'Scan Ticket'}
                </button>
            </form>

            {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ScanTicket;

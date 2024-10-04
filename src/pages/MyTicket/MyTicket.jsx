// src/MyTickets.jsx

import React, { useEffect, useState } from 'react';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = 4; // Assume this is obtained from logged-in user context
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpLm9vb25ubjE1QGdtYWlsLmNvbSIsImV4cCI6MTcyODA5NTEwNywiaWF0IjoxNzI4MDU5MTA3fQ.ry6vXNh8mcgYvWan65eOWSqDh2MBo1RJezkg1BFv7z4'; // Replace with actual JWT token

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/v1/tickets/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch tickets: ${response.statusText}`);
                }

                const data = await response.json();
                setTickets(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [userId, token]);

    return (
        <div>
            <h1>My Tickets</h1>
            {loading && <p>Loading tickets...</p>}
            {error && <p>Error: {error}</p>}
            {tickets.length === 0 && !loading ? (
                <p>No tickets found.</p>
            ) : (
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket.id}>
                            <h2>{ticket.concert.name}</h2>
                            <p>TickketID : {ticket.id}</p>
                            <p>Ticket Code: {ticket.ticketCode}</p>
                            <p>Status: {ticket.ticketStatus}</p>
                            <p>Price: ${ticket.ticketPrice}</p>
                            <p>Buy Date: {new Date(ticket.ticketBuyDate).toLocaleString()}</p>
                            <a href={`/my-tickets/detail/${ticket.id}`}>View Details</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyTickets;

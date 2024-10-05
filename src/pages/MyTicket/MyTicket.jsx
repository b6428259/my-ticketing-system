// src/MyTickets.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Import your AuthContext
import { Link } from 'react-router-dom';

const MyTickets = () => {
    const { user, isAuthenticated } = useAuth(); // Get user info from context
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const userId = user ? user.id : null; 
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchTickets = async () => {
            if (!isAuthenticated || !userId || !token) {
                setError('You need to be logged in to view your tickets.');
                setLoading(false);
                return;
            }

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
    }, [userId, token, isAuthenticated]);

    return (
        <div>
            <h1>My Tickets</h1>
            {loading && <p>Loading tickets...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            {!loading && tickets.length === 0 && (
                <p>No tickets found.</p>
            )}
            {!loading && tickets.length > 0 && (
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket.id}>
                            <h2>{ticket.concert.name}</h2>
                            <p>Ticket ID: {ticket.id}</p>
                            <p>Ticket Code: {ticket.ticketCode}</p>
                            <p>Status: {ticket.ticketStatus}</p>
                            <p>Price: ${ticket.ticketPrice.toFixed(2)}</p>
                            <p>Buy Date: {new Date(ticket.ticketBuyDate).toLocaleString()}</p>
                            {/* Use Link for navigation to ticket details */}
                            <Link to={`/my-tickets/detail/${ticket.id}`}>View Details</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyTickets;
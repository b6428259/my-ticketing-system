// src/pages/MyTicket/components/TicketDetail/TicketDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Use useParams to extract ticketId from URL
import { useAuth } from '../../../../contexts/AuthContext'; // Use the index file for cleaner imports
import QRCode from "react-qr-code";

const TicketDetail = () => {
    const { ticketId } = useParams(); // Extract ticketId from URL
    const { isAuthenticated } = useAuth(); // Check if the user is authenticated
    const [ticketDetail, setTicketDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicketDetail = async () => {
            if (!isAuthenticated) {
                setError('You need to be logged in to view ticket details.');
                setLoading(false);
                return;
            }

            setLoading(true);
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`http://localhost:8080/api/v1/tickets/${ticketId}/detail`, {
                    method: 'GET', // GET request
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch ticket details: ${response.statusText}`);
                }

                const data = await response.json();
                setTicketDetail(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTicketDetail();
    }, [ticketId, isAuthenticated]);

    if (loading) {
        return <p>Loading ticket details...</p>;
    }

    if (error) {
        return <p className="error-message">Error: {error}</p>;
    }

    if (!ticketDetail) {
        return <p>No ticket details available.</p>;
    }

    return (
        <div>
            <h1>Ticket Details</h1>
            <h2>{ticketDetail.concertName}</h2>
            <p><strong>Ticket ID:</strong> {ticketDetail.id}</p>
            <p><strong>Ticket Code:</strong> {ticketDetail.ticketCode}</p>
            <p><strong>Status:</strong> {ticketDetail.ticketStatus}</p>
            <p><strong>Price:</strong> ${ticketDetail.ticketPrice.toFixed(2)}</p>
            <p><strong>Buy Date:</strong> {new Date(ticketDetail.ticketBuyDate).toLocaleString()}</p>
            <p><strong>Expire Date:</strong> {new Date(ticketDetail.ticketExpireDate).toLocaleString()}</p>
            <p><strong>Location:</strong> {ticketDetail.concertLocation}</p>
            <p><strong>Date:</strong> {new Date(ticketDetail.concertDate).toLocaleString()}</p>
            <p><strong>Type:</strong> {ticketDetail.ticketType}</p>

            {/* QR Code for Ticket Code */}
            <h3>QR Code</h3>
            <QRCode value={ticketDetail.ticketCode} size={128} /> {/* You can adjust the size as needed */}
        </div>
    );
};

export default TicketDetail;

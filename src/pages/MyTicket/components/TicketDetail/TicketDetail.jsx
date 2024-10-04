// src/pages/ScanTicket/ScanTicket.jsx
import React, { useState } from 'react';
import { useTicket } from '../../contexts/TicketContext';
import QrReader from 'react-qr-reader';

const ScanTicket = () => {
    const [ticketCode, setTicketCode] = useState('');
    const [cameraOpen, setCameraOpen] = useState(false);
    const { handleScan, responseMessage, error, scanning } = useTicket();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        handleScan(ticketCode); // Call handleScan from context
        setTicketCode(''); // Clear the input after submitting (optional)
    };

    const handleScanResult = (result) => {
        if (result) {
            setTicketCode(result);
            handleScan(result); // Automatically call handleScan after scanning
            setCameraOpen(false); // Close the camera after scanning
        }
    };

    const handleError = (err) => {
        console.error('Error scanning QR code: ', err);
    };

    return (
        <div>
            <h1>Scan Your Ticket</h1>

            <button onClick={() => setCameraOpen(!cameraOpen)}>
                {cameraOpen ? 'Close Camera' : 'Open Camera to Scan QR Code'}
            </button>
            <form onSubmit={handleSubmit}>
                
                <input
                    type="text"
                    placeholder="Enter Ticket Code"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                    required
                />
                <button type="submit" disabled={scanning}>
                    {scanning ? 'Scanning...' : 'Scan Ticket'}
                </button>
                
            </form>

            <button onClick={() => setCameraOpen(!cameraOpen)}>
                {cameraOpen ? 'Close Camera' : 'Open Camera to Scan QR Code'}
            </button>

            {cameraOpen && (
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScanResult}
                    style={{ width: '100%' }}
                />
            )}

            {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ScanTicket;

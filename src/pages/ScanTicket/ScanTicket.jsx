// src/pages/ScanTicket/ScanTicket.jsx
import React, { useState } from 'react';
import { useTicket } from '../../contexts/TicketContext';
import QrScanner from 'react-qr-scanner';

const ScanTicket = () => {
    const [cameraOpen, setCameraOpen] = useState(false);
    const { handleScan, responseMessage, error, scanning } = useTicket();

    const handleScanResult = (result) => {
        if (result) {
            handleScan(result.text); // ใช้ result.text เพื่อดึงค่า QR ที่สแกนได้
            setCameraOpen(false); // ปิดกล้องหลังจากสแกนเสร็จ
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

            {cameraOpen && (
                <QrScanner
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

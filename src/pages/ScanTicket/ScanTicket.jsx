// src/pages/ScanTicket/ScanTicket.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useTicket } from '../../contexts/TicketContext';
import { Html5Qrcode } from 'html5-qrcode';

const ScanTicket = () => {
    const [cameraOpen, setCameraOpen] = useState(false);
    const { handleScan, responseMessage, error } = useTicket();
    const html5QrCodeRef = useRef(null);
    const [qrCodeScanner, setQrCodeScanner] = useState(null);

    useEffect(() => {
        // Initialize the QR code scanner
        if (cameraOpen) {
            const qrCodeScanner = new Html5Qrcode("qr-reader");
            setQrCodeScanner(qrCodeScanner);

            console.log("Starting QR code scanner...");
            qrCodeScanner.start(
                { facingMode: "environment" }, // Use back camera
                {
                    fps: 30, // Set frame rate for the scanner
                    qrbox: { width: 300, height: 300 }, // Size of the scanning box
                },
                handleScanResult,
                handleError
            ).then(() => {
                console.log("QR code scanner started successfully");
            }).catch(err => {
                console.error("Failed to start QR code scanner:", err);
            });
        }

        // Cleanup function to stop the scanner
        return () => {
            if (qrCodeScanner) {
                qrCodeScanner.stop().then(() => {
                    console.log("QR code scanner stopped successfully");
                }).catch(err => {
                    console.error("Failed to stop scanning:", err);
                });
            }
        };
    }, [cameraOpen]);

    const handleScanResult = (decodedText, decodedResult) => {
        console.log("QR code scanned: ", decodedText);
        handleScan(decodedText); // Use decodedText to extract the QR code value
        setCameraOpen(false); // Close the camera after scanning
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
                <div id="qr-reader" style={{ width: '100%', height: '400px', position: 'relative' }}></div>
            )}

            {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ScanTicket;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import QRCode from "react-qr-code";
import { Card, CardHeader, CardBody, CardFooter, Button, Image, Tooltip } from "@nextui-org/react";
import { FaEye, FaEyeSlash, FaDownload, FaTicketAlt, FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TicketDetail = () => {
    const { ticketId } = useParams();
    const { isAuthenticated } = useAuth();
    const [ticketDetail, setTicketDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullCode, setShowFullCode] = useState(false);
    const [copied, setCopied] = useState(false);

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
                    method: 'GET',
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

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(ticketDetail.ticketCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'USED':
                return 'text-yellow-500';
            case 'UNUSED':
                return 'text-green-500';
            case 'EXPIRED':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        );
    }

    if (!ticketDetail) {
        return <p className="text-center text-gray-500 mt-8">No ticket details available.</p>;
    }

    const truncatedTicketCode = ticketDetail.ticketCode.length > 30 
        ? ticketDetail.ticketCode.slice(0, 15) + '...' + ticketDetail.ticketCode.slice(-15) 
        : ticketDetail.ticketCode;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="py-4 px-4 max-w-2xl mx-auto shadow-lg">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-2xl text-purple-600">{ticketDetail.concertName}</h4>
                    <small className="text-default-500"><strong>Ticket ID:</strong> {ticketDetail.id}</small>
                </CardHeader>

                {ticketDetail.concertPicUrl && (
                    <Image
                        alt="Concert Picture"
                        className="object-cover rounded-xl my-4 hover:scale-105 transition-transform duration-300"
                        src={ticketDetail.concertPicUrl}
                        width="100%"
                        height={250}
                    />
                )}

                <CardBody className="py-4 px-7">
                    <div className="space-y-4">
                        <div className="bg-gray-900 p-3 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <FaTicketAlt className="text-purple-500 flex-shrink-0" />
                                <strong className="text-white">Ticket Code:</strong>
                            </div>
                            <div className="flex flex-wrap items-center justify-between">
                                <div className="max-w-full w-full sm:w-3/4 mb-2 sm:mb-0">
                                    <span className="font-mono text-white break-all">
                                        {showFullCode ? ticketDetail.ticketCode : truncatedTicketCode}
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <Tooltip content={showFullCode ? "Hide Code" : "Show Full Code"}>
                                        <button
                                            onClick={() => setShowFullCode(!showFullCode)}
                                            className="text-blue-400 hover:text-blue-300 focus:outline-none"
                                        >
                                            {showFullCode ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                        </button>
                                    </Tooltip>
                                    <Tooltip content={copied ? "Copied!" : "Copy Code"}>
                                        <button
                                            onClick={copyToClipboard}
                                            className="text-green-400 hover:text-green-300 focus:outline-none"
                                        >
                                            <FaCopy size={16} />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <p>
                                <strong>Status:</strong>{' '}
                                <span className={`capitalize font-semibold ${getStatusColor(ticketDetail.ticketStatus)}`}>
                                    {ticketDetail.ticketStatus}
                                </span>
                            </p>
                            <p><strong>Price:</strong> <span className="text-green-600 font-semibold">${ticketDetail.ticketPrice.toFixed(2)}</span></p>
                            <p><strong>Buy Date:</strong> {new Date(ticketDetail.ticketBuyDate).toLocaleDateString()}</p>
                            <p><strong>Expire Date:</strong> {new Date(ticketDetail.ticketExpireDate).toLocaleDateString()}</p>
                            <p><strong>Location:</strong> {ticketDetail.concertLocation}</p>
                            <p><strong>Date:</strong> {new Date(ticketDetail.concertDate).toLocaleString()}</p>
                            <p><strong>Type:</strong> {ticketDetail.ticketType}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                            <h5 className="font-semibold text-medium mb-2 text-center text-white">QR Code</h5>
                            <QRCode value={ticketDetail.ticketCode} size={150} />
                        </div>
                    </div>
                </CardBody>

                <CardFooter className="flex justify-center">
                    <Button color="secondary" auto startContent={<FaDownload />}>
                        Download Ticket
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default TicketDetail;
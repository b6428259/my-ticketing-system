import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import TicketTypeRow from './components/TicketTypeRow/TicketTypeRow';
import LoginRequired from '../../components/Modals/LoginRequiredModal';
import { Button } from '@nextui-org/react';
import { getConcertDetails } from '../../services/concert/show-api';  // Import the API call

const Show = () => {
    const { concertId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [concert, setConcert] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch concert details using the concertId
    useEffect(() => {
        const fetchConcert = async () => {
            try {
                const response = await getConcertDetails(concertId);  // Use the API call from ShowApi.jsx
                setConcert(response.data.data);
            } catch (error) {
                console.error('Error fetching concert details:', error);
            }
        };

        fetchConcert();
    }, [concertId]);

    if (!concert) {
        return <div>Loading concert details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Concert Details Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">{concert.concertName}</h1>
                    <img
                        src={concert.concertPicUrl}
                        alt={concert.concertName}
                        className="w-full h-auto max-h-96 rounded-lg object-cover mb-4"
                    />
                    <p className="text-lg">{concert.concertDescription}</p>
                    <p className="text-sm text-gray-400 mt-2">{new Date(concert.concertStartDate).toLocaleString()}</p>
                    <p className="text-sm text-gray-400">{concert.concertLocation}</p>
                </div>

                <div id="product-section" className="mt-12">
                    <h1 className="text-xl sm:text-2xl font-bold my-4 text-center">Book Ticket Now!</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Ticket Section */}
                        <div id="ticket-section" className="mb-6 align-middle">
                            <h1 className="text-xl sm:text-2xl font-bold my-4 sm:mb-6 mb-20 text-center">Select Ticket Type</h1>
                            <div className="max-w-sm sm:max-w-md mx-auto rounded-lg p-4 sm:p-6 shadow-lg bg-black bg-opacity-80">
                                <div className="flex justify-center mb-4">
                                    <img src={concert.concertLogoUrl} alt={concert.name} className="rounded-full w-24 h-24 sm:w-32 sm:h-32" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">{concert.name}</h2>
                                <div className="flex justify-between items-center mt-4 sm:mt-6">
                                    {user ? (
                                        <Button
                                            onClick={() => navigate(`/reserve/${concertId}`)}
                                            variant="contained"
                                            style={{
                                                backgroundColor: loading ? '#8d8d8d' : 'green',
                                                color: 'white',
                                                cursor: 'pointer',
                                                padding: '12px 24px',
                                                fontSize: '18px',
                                                borderRadius: '8px',
                                                width: '200px',
                                            }}
                                        >
                                            {loading ? 'Loading...' : 'Book Now'}
                                        </Button>
                                    ) : (
                                        <LoginRequired />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;

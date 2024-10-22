import axios from 'axios';

// Use import.meta.env to access Vite environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ReserveApi = axios.create({
    baseURL: apiBaseUrl,
});

// Define your API calls here
export const buyTickets = (data) => {
    return ReserveApi.post('/tickets/buy', data);
};

export const getConcertRounds = (concertId) => {
    return ReserveApi.get(`/concert-rounds/by-concert/${concertId}`);
};

export const getProductsByConcert = (concertId) => {
    return ReserveApi.get(`/products/concert/${concertId}`);
};

export default ReserveApi;

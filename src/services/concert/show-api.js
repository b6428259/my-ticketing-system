import axios from 'axios';

// Use Vite environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ShowApi = axios.create({
    baseURL: apiBaseUrl,
});

// Define your API calls here
export const getConcertDetails = (concertId) => {
    return ShowApi.get(`/concert/${concertId}`);
};

export const getConcertRounds = (concertId) => {
    return ShowApi.get(`/concert-rounds/by-concert/${concertId}`);
};

export const getProductsByConcert = (concertId) => {
    return ShowApi.get(`/products/concert/${concertId}`);
};

export const getConcerts = () => {
    return ShowApi.get('/concert');
};

export default ShowApi;

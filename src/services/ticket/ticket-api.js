import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const TicketApi = axios.create({
    baseURL: apiBaseUrl,
    });
    
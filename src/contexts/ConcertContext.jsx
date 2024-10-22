import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getConcertRounds, getProductsByConcert } from '../services/reserve/reserve-api';

export const ConcertContext = createContext();

export const ConcertProvider = ({ children, concertId }) => {
    const [rounds, setRounds] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedRound, setSelectedRound] = useState(new Set([]));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch concert rounds based on the provided concertId
    useEffect(() => {
        const fetchConcertRounds = async () => {
            if (!concertId) {
                setError('Concert ID is not provided');
                return; 
            }
        
            setLoading(true);
            setError(null);
            try {
                const response = await getConcertRounds(concertId);
                console.log("Fetched concert rounds:", response.data.data);
                setRounds(response.data.data);
            } catch (err) {
                setError('Error fetching concert rounds');
                console.error('Error fetching concert rounds:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchConcertRounds();
    }, [concertId]);

    // Fetch products based on the selected round
    useEffect(() => {
        const fetchProducts = async () => {
            if (selectedRound.size > 0 && concertId) {
                const roundId = Array.from(selectedRound)[0];
                const round = rounds.find(r => r.id.toString() === roundId);

                if (round) {
                    try {
                        const productResponse = await getProductsByConcert(concertId);
                        setProducts(productResponse.data.data.filter(product => product.roundNumber === round.roundNumber));
                    } catch (error) {
                        console.error('Error fetching products:', error);
                    }
                }
            }
        };

        fetchProducts();
    }, [selectedRound, concertId, rounds]);

    return (
        <ConcertContext.Provider value={{ 
            rounds, 
            products, 
            selectedRound, 
            setSelectedRound, 
            loading, 
            error 
        }}>
            {children}
        </ConcertContext.Provider>
    );
};

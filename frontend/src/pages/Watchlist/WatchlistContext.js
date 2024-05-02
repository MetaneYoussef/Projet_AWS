import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState({
        films: [],
        series: []
    });

    const fetchWatchlist = useCallback(async (userId, token) => {
        try {
            const filmsResponse = await axios.get(`/api/user/${userId}/filmsWatchlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const seriesResponse = await axios.get(`/api/user/${userId}/seriesWatchlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWatchlist({
                films: filmsResponse.data,
                series: seriesResponse.data
            });
        } catch (error) {
            console.error('Failed to fetch watchlist:', error);
        }
    }, []);

    const addToWatchlist = useCallback(async (userId, token, item, type) => {
        try {
            const response = await axios.post(`/api/user/${userId}/${type}Watchlist`, item, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWatchlist(prev => ({
                ...prev,
                [type]: [...prev[type], response.data]
            }));
        } catch (error) {
            console.error('Failed to add to watchlist:', error);
        }
    }, []);

    const removeFromWatchlist = useCallback(async (userId, token, tmdbId, type) => {
        try {
            await axios.delete(`/api/user/${userId}/${type}Watchlist/${tmdbId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWatchlist(prev => ({
                ...prev,
                [type]: prev[type].filter(item => item.tmdbId !== tmdbId)
            }));
        } catch (error) {
            console.error('Failed to remove from watchlist:', error);
        }
    }, []);

    return (
        <WatchlistContext.Provider value={{ watchlist, fetchWatchlist, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);
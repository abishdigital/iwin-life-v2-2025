import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/eventsApi';

export const useFetchEvents = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getEvents = async (formData: { pageCount: number; limitCount: number }) => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchEvents(formData);

            setEvents(data.events);
        } catch (err) {
            // @ts-ignore
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    };

    return { getEvents, events, loading, error };
};
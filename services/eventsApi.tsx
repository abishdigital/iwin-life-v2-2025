import { apiRequest } from './apiService';

export const fetchEvents = async (formData: { pageCount: number, limitCount: number }) => {
    return await apiRequest('POST', 'events/get-all-events', formData);
}

export const addEvent = async (formData: any) => {
    return await apiRequest('POST', 'events/add-one-event', formData);
}
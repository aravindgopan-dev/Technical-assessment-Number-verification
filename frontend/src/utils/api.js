import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

// Common API utility functions
export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
        defaultOptions.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, defaultOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Specific API functions matching Postman collection
export const registerUser = async (userData) => {
    return apiRequest(API_ENDPOINTS.auth.register, {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

export const loginUser = async (userData) => {
    return apiRequest(API_ENDPOINTS.auth.login, {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

export const verifyArmstrongNumber = async (number) => {
    return apiRequest(API_ENDPOINTS.armstrong.verify, {
        method: 'POST',
        body: JSON.stringify({ number }),
    });
};

export const getAllUsers = async (page = 1) => {
    return apiRequest(`${API_ENDPOINTS.users.getAll}?page=${page}`, {
        method: 'GET',
    });
};

export const getUserById = async (userId) => {
    return apiRequest(`${API_ENDPOINTS.users.getById}/${userId}`, {
        method: 'GET',
    });
};

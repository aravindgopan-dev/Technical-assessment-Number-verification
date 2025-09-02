// API configuration for different environments
const API_CONFIG = {
    development: {
        baseUrl: '', // Use Vite proxy in development
    },
    test: {
        baseUrl: 'http://localhost:5000', // Direct call for test environment
    },
    production: {
        baseUrl: 'https://your-production-domain.com', // Change this for production
    },
};

// Get current environment (default to development)
const currentEnv = import.meta.env.MODE || 'development';

export const API_BASE_URL = API_CONFIG[currentEnv]?.baseUrl || API_CONFIG.development.baseUrl;

// API endpoints
export const API_ENDPOINTS = {
    auth: {
        register: '/api/auth/register',
        login: '/api/auth/login',
    },
    armstrong: {
        verify: '/api/armstrong/verify',
    },
    users: {
        getAll: '/api/users',
        getById: '/api/users',
    },
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Helper function to make authenticated API calls
export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = getAuthHeaders();

    const config = {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        if (response.status === 401) {
            // Token expired or invalid, redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
            return null;
        }

        return response;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

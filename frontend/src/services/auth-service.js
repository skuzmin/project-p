import axios from '@/axios';

const login = credentials => {
    return axios.post('/api/login', credentials);
};

const register = data => {
    return axios.post('/api/register', data);
};

const verify = data => {
    return axios.post('/api/verify', data);
};

const forgotPassword = data => {
    return axios.post('/api/forgot-password', data);
};

const setPassword = data => {
    return axios.post('/api/set-new-password', data);
};

export const authService = {
    login,
    register,
    forgotPassword,
    verify,
    setPassword,
};

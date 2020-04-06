import axios from '@/axios';

const login = credentials => {
    return axios.post('login', credentials);
};

const register = data => {
    return axios.post('register', data);
};

const verify = data => {
    return axios.post('verify', data);
};

const forgotPassword = data => {
    return axios.post('forgot-password', data);
};

const setPassword = data => {
    return axios.post('set-new-password', data);
};

export const authService = {
    login,
    register,
    forgotPassword,
    verify,
    setPassword,
};

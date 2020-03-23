import axios from '@/axios';

const login = credentials => {
    return axios.post('login', credentials);
};

export const authService = {
    login,
};

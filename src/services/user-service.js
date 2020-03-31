import axios from '@/axios';

const getUsers = () => {
    return axios.get('users');
};

const deleteUser = id => {
    return axios.delete(`user/${id}`);
};

const getUserById = id => {
    return axios.get(`user/${id}`);
};

const activateUser = id => {
    return axios.post(`user/${id}/activate`);
};

export const userService = {
    getUsers,
    getUserById,
    deleteUser,
    activateUser,
};

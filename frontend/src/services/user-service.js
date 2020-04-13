import * as axios from 'axios';

const getUsers = () => {
    return axios.get('/api/users');
};

const deleteUser = id => {
    return axios.delete(`/api/users/${id}`);
};

const getUserById = id => {
    return axios.get(`/api/users/${id}`);
};

const activateUser = id => {
    return axios.post(`/api/users/${id}/activate`);
};

const createUser = user => {
    return axios.post(`/api/users`, user);
};

export const userService = {
    getUsers,
    getUserById,
    deleteUser,
    activateUser,
    createUser,
};

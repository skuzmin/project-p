import * as axios from 'axios';

const getUsers = () => {
    return axios.get('/api/users');
};

const deleteUser = id => {
    return axios.delete(`/api/user/${id}`);
};

const getUserById = id => {
    return axios.get(`/api/user/${id}`);
};

const activateUser = id => {
    return axios.post(`/api/user/${id}/activate`);
};

export const userService = {
    getUsers,
    getUserById,
    deleteUser,
    activateUser,
};

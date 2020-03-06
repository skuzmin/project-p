import { HTTP } from '../shared';

const getUsers = async () => {
    try {
        const response = await HTTP.get('users');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async id => {
    try {
        await HTTP.delete(`user/${id}`);
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async id => {
    try {
        const response = await HTTP.get(`user/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const userService = {
    getUsers,
    getUserById,
    deleteUser,
};

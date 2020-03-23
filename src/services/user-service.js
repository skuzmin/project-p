import axios from '@/axios';

const getUsers = async () => {
    try {
        const response = await axios.get('users');
        return response.data;
    } catch (error) {
        throw new Error('Cannot receive data from the server');
    }
};

const deleteUser = async id => {
    try {
        await axios.delete(`user/${id}`);
    } catch (error) {
        throw new Error('Server error, cannot delete the user');
    }
};

const getUserById = async id => {
    try {
        const response = await axios.get(`user/${id}`);
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

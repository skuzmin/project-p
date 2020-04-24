import * as axios from 'axios';

const getParkings = async () => {
    return axios.get('/api/parkings');
};

const getParkingById = async id => {
    return axios.get(`/api/parkings/${id}`);
};

const createParking = parking => {
    return axios.post(`/api/parkings`, parking);
};

const deleteParking = id => {
    return axios.delete(`/api/parkings/${id}`);
};

export const parkingService = {
    getParkings,
    getParkingById,
    createParking,
    deleteParking,
};

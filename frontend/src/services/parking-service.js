import * as axios from 'axios';

const getParkings = async () => {
    try {
        const response = await axios.get('/mocks/parkings.json');
        return response.data;
    } catch (error) {
        return error;
    }
};

const getParkingById = async id => {
    try {
        const response = await axios.get('/mocks/parkings.json');
        const item = response.data.find(r => r.id === id);
        return item;
    } catch (error) {
        return error;
    }
};

export const parkingService = {
    getParkings,
    getParkingById,
};

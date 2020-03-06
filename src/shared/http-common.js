import * as axios from 'axios';

export const HTTP = axios.create({
    baseURL: `http://localhost:9001/api/`,
});

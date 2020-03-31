import * as axios from 'axios';

export default axios.create({
    baseURL: 'http://3.15.208.153:9001/api/',
    // baseURL: 'http://localhost:9001/api',
});

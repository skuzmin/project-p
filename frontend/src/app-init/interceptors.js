import * as axios from 'axios';
import store from '@/store';
import { AUTH_LOGOUT } from '@/store/modules/auth/auth-action-types';
import { TOAST_ERROR } from '@/store/modules/buefy/buefy-action-types';

export default function interceptorsSetup() {
    axios.interceptors.request.use(
        config => {
            const token = store.getters.token;
            if (token) {
                config.headers.common['Authorization'] = `JWT ${token}`;
            }
            return config;
        },
        err => Promise.reject(err),
    );
    axios.interceptors.response.use(
        response => response,
        err => {
            if (!err.response) {
                store.dispatch(TOAST_ERROR, err.message);
                return Promise.reject(err);
            }
            if (err.response.status === 401) {
                store.dispatch(AUTH_LOGOUT);
                store.dispatch(TOAST_ERROR, 'You are not authorized');
            }
            if (err.response.status === 500) {
                store.dispatch(TOAST_ERROR, err.response.data);
            }
            return Promise.reject(err.response);
        },
    );
}

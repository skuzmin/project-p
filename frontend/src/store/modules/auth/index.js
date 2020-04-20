import { authService } from '../../../services';
import { AUTH_LOGIN, AUTH_LOGOUT, REGISTER, VERIFY, AUTH_CHECK, FORGOT_PASSWORD, SET_PASSWORD, APP_HEART_BEAT, SET_USER } from './auth-action-types';
import { removeToken, setToken, parseToken, getToken } from './auth-helpers';
import { HEART_BEAT_INTERVAL } from '../../../shared/constants';
import router from '@/router';

const state = {
    currentUser: {},
    appHeartBeat: null,
    token: null,
};

const mutations = {
    [AUTH_LOGIN]: (state, token) => {
        state.token = token;
    },
    [SET_USER]: (state, user) => {
        state.currentUser = user;
    },
    [AUTH_LOGOUT]: state => {
        state.currentUser = {};
        state.token = null;
        clearInterval(state.appHeartBeat);
        state.appHeartBeat = null;
    },
    [APP_HEART_BEAT]: (state, appHeartBeat) => {
        state.appHeartBeat = appHeartBeat;
    },
};

const actions = {
    [AUTH_LOGIN]: ({ commit, dispatch }, credentials) => {
        return new Promise((resolve, reject) => {
            authService
                .login(credentials)
                .then(res => {
                    const { token } = res.data;
                    const user = parseToken(token);
                    if (!user) {
                        dispatch(AUTH_LOGOUT);
                        reject();
                    } else {
                        setToken(token);
                        dispatch(APP_HEART_BEAT);
                        commit(AUTH_LOGIN, token);
                        commit(SET_USER, user);
                        resolve();
                    }
                })
                .catch(e => reject(e));
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        removeToken();
        commit(AUTH_LOGOUT);
        router.push('/login');
    },
    [AUTH_CHECK]: ({ commit, dispatch }) => {
        const token = getToken();
        if (token) {
            const user = parseToken(token);
            if (user) {
                commit(AUTH_LOGIN, token);
                commit(SET_USER, user);
                dispatch(APP_HEART_BEAT);
            } else {
                commit(AUTH_LOGOUT);
            }
        } else {
            commit(AUTH_LOGOUT);
        }
    },
    [APP_HEART_BEAT]: ({ commit, getters }) => {
        const appHeatBeat = setInterval(() => {
            authService.appHeartBeat({ token: getters.token }).then(result => {
                const { token } = result.data;
                const user = parseToken(token);
                commit(AUTH_LOGIN, token);
                commit(SET_USER, user);
                setToken(token);
            });
        }, HEART_BEAT_INTERVAL);
        commit(APP_HEART_BEAT, appHeatBeat);
    },
    [REGISTER]: (_, data) => {
        return new Promise((resolve, reject) => {
            authService
                .register(data)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    },
    [VERIFY]: (_, token) => {
        return new Promise((resolve, reject) => {
            authService
                .verify({ token })
                .then(() => resolve())
                .catch(err => reject(err));
        });
    },
    [FORGOT_PASSWORD]: (_, email) => {
        return new Promise((resolve, reject) => {
            authService
                .forgotPassword({ email })
                .then(() => resolve())
                .catch(err => reject(err));
        });
    },
    [SET_PASSWORD]: (_, { token, password }) => {
        return new Promise((resolve, reject) => {
            authService
                .setPassword({ token, password })
                .then(() => resolve())
                .catch(err => reject(err));
        });
    },
};

const getters = {
    isLoggedIn: state => !!state.currentUser.id && !!state.token,
    token: state => state.token,
    currentUser: state => state.currentUser,
};

export default {
    state,
    mutations,
    actions,
    getters,
};

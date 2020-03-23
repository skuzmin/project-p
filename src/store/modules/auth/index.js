import { authService } from '../../../services';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from './auth-action-types';
import { removeToken, setToken, parseToken, getToken } from './auth-helpers';

const state = {
    currentUser: null,
    token: null,
};

const mutations = {
    [AUTH_LOGIN]: (state, { user, token }) => {
        state.currentUser = user;
        state.token = token;
    },
    [AUTH_LOGOUT]: state => {
        state.currentUser = null;
        state.token = null;
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
                        commit(AUTH_LOGIN, { user, token });
                        resolve();
                    }
                })
                .catch(e => {
                    dispatch(AUTH_LOGOUT);
                    reject(e);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        commit(AUTH_LOGOUT);
        removeToken();
    },
    [AUTH_CHECK]: ({ commit }) => {
        const token = getToken();
        if (token) {
            const user = parseToken(token);
            if (user) {
                setToken(token);
                commit(AUTH_LOGIN, { user, token });
            } else {
                commit(AUTH_LOGOUT);
                removeToken();
            }
        } else {
            commit(AUTH_LOGOUT);
            removeToken();
        }
    },
};

const getters = {
    isLoggedIn: state => !!state.currentUser,
    token: state => state.token,
};

export default {
    state,
    mutations,
    actions,
    getters,
};

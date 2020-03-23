import { ToastProgrammatic as Toast } from 'buefy';
import { SUCCESS, ERROR, LOADING } from './buefy-action-types';

const state = {
    isLoading: false,
};

const mutations = {
    [LOADING]: (state, status) => {
        state.isLoading = status;
    },
};

const actions = {
    [SUCCESS]: (_, message) => {
        Toast.open({ message, type: 'is-success', queue: false });
    },
    [ERROR]: (_, message) => {
        Toast.open({ message, type: 'is-danger', queue: false, duration: 3000 });
    },
    [LOADING]: ({ commit }, status) => {
        commit(LOADING, status);
    },
};

const getters = {
    isLoading: state => state.isLoading,
};

export default { state, mutations, actions, getters };

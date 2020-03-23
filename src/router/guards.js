import store from '../store';

export const authGuard = (_to, _from, next) => {
    if (store.getters.isLoggedIn) {
        next();
    } else {
        next('/login');
    }
};

export const loginGuard = (_to, _from, next) => {
    if (!store.getters.isLoggedIn) {
        next();
    } else {
        next('/');
    }
};

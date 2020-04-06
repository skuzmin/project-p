const AUTH_TOKEN = 'p-login';

export const setToken = token => {
    localStorage.setItem(AUTH_TOKEN, token);
};

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
};

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

export const parseToken = token => {
    try {
        const user = atob(token.split('.')[1]);
        return JSON.parse(user);
    } catch (e) {
        return null;
    }
};

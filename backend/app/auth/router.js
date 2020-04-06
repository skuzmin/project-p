const views = require('./views');
const { baseUrl } = require('../config');

const makeRoutes = function (app) {
    app.post(`${baseUrl}/login`, views.login);
    app.post(`${baseUrl}/register`, views.register);
    app.post(`${baseUrl}/verify`, views.verify);
    app.post(`${baseUrl}/forgot-password`, views.forgotPassword);
    app.post(`${baseUrl}/set-new-password`, views.setNewPassword);
};

module.exports = makeRoutes;
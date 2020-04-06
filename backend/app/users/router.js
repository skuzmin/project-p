const views = require('./views');
const { baseUrl } = require('../config');

const makeRoutes = function (app) {
    app.post(`${baseUrl}/user`, views.createUser);
    app.get(`${baseUrl}/users`, views.getUsers);
    app.get(`${baseUrl}/user/:id`, views.getUserById);
    app.put(`${baseUrl}/user/:id`, views.updateUserById);
    app.del(`${baseUrl}/user/:id`, views.deleteUserById);
    app.post(`${baseUrl}/user/:id/activate`, views.activateUser);
};

module.exports = makeRoutes;

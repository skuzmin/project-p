const views = require('./views');
const { baseUrl } = require('../config');

const makeRoutes = function (app) {
    app.post(`${baseUrl}/users`, views.createUser);
    app.get(`${baseUrl}/users`, views.getUsers);
    app.get(`${baseUrl}/users/:id`, views.getUserById);
    app.put(`${baseUrl}/users/:id`, views.updateUserById);
    app.del(`${baseUrl}/users/:id`, views.deleteUserById);
    app.post(`${baseUrl}/users/:id/activate`, views.activateUser);
};

module.exports = makeRoutes;

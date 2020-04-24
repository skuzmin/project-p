const views = require('./views');
const { baseUrl } = require('../config');

const makeRoutes = function (app) {
    app.post(`${baseUrl}/parkings`, views.createParking);
    app.get(`${baseUrl}/parkings`, views.getParkings);
    app.get(`${baseUrl}/parkings/:id`, views.getParkingById);
    app.del(`${baseUrl}/parkings/:id`, views.deleteParkingById);
};

module.exports = makeRoutes;

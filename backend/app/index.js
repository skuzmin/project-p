const uWS = require('uWebSockets.js');

const app = uWS.App();

require('./users/router')(app);
require('./parkings/router')(app);
require('./auth/router')(app);

module.exports = app;

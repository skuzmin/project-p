const { port } = require('./app/config');

require('./app').listen(port, token => {
    if (token) {
        console.log(`Listening to port ${port}`);
    } else {
        console.log(`Failed to listen to port ${port}`);
    }
});

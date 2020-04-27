const repository = require('./repository');
const { isAuthenticated } = require('../auth/helpers');
const { newParkingValidation } = require('./helpers');

const views = {
    createParking,
    getParkings,
    getParkingById,
    deleteParkingById
};

async function getParkings(res, req) {
    res.onAborted();
    isAuthenticated(res,req);
    try {
        const parkings = await repository.getParkings();
        res
            .writeStatus('200 OK')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify(parkings));
    } catch (error) {
        res
            .writeStatus('500 Internal Server Error')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify({ error }));
    }
}

async function getParkingById(res, req) {
    res.onAborted();
    const id = req.getParameter(0);
    isAuthenticated(res,req);
    try {
        const parking = await repository.getParkingById(id);
        if (parking) {
            res
                .writeStatus('200 OK')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify(parking));
        } else {
            res
                .writeStatus('404 Not Found')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error: 'parking not found' }));
        }
    } catch (error) {
        res
            .writeStatus('500 Internal Server Error')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify({ error }));
    }
}

async function deleteParkingById(res, req) {
    res.onAborted();
    const id = req.getParameter(0);
    isAuthenticated(res,req);
    try {
        await repository.deleteParkingById(id);
        res
            .writeStatus('204 No Content')
            .end();
    } catch (error) {
        res
            .writeStatus('500 Internal Server Error')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify({ error }));
    }
}

function createParking(res) {
    res.onAborted();
    res.onData(async (ab) => {
        const parking = JSON.parse(Buffer.from(ab));
        const error = newParkingValidation(parking);
        if (error) {
            res
                .writeStatus('400 Bad Request')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error }));
        } else {
            try {
                const isParkingExist = await repository.getParkingByNameAndAddress(parking.name, parking.address);
                if (isParkingExist) {
                    res
                        .writeStatus('400 Bad Request')
                        .writeHeader('Content-Type', 'application/json')
                        .end(JSON.stringify({ error: 'Parking has been already added' }));
                } else {
                    try {
                        const newParkingId = await repository.createParking(parking);
                        res
                            .writeStatus('201 Created')
                            .end(JSON.stringify(newParkingId));
                    } catch (error) {
                        res
                            .writeStatus('500 Internal Server Error')
                            .writeHeader('Content-Type', 'application/json')
                            .end(JSON.stringify({ error }));
                    }
                }
            } catch (error) {
                res
                    .writeStatus('500 Internal Server Error')
                    .writeHeader('Content-Type', 'application/json')
                    .end(JSON.stringify({ error }));
            }
        }
    });
}

module.exports = views;

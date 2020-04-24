const db = require('../db');

const repository = {
    getParkings,
    getParkingById,
    createParking,
    deleteParkingById
};

async function getParkings() {
    const parkings = await db.any(`SELECT * FROM parkings`);
    return parkings;
}

async function getParkingById(id) {
    const parking = await db.oneOrNone(`SELECT * FROM parkings WHERE id = ${id}`);
    return parking;
}

async function createParking(parking) {
    const id = await db.one(`
            INSERT INTO parkings (name, address, price, total_slots, is_active)
            VALUES ('${parking.name}', '${parking.address}', ${parking.price}, ${parking.totalSlots}, '${!!parking.isActive}') 
            RETURNING id
        `);
    return id;
}

async function deleteParkingById(id) {
    await db.none(`DELETE FROM parkings WHERE id = ${id}`);
}

module.exports = repository;

const helpers = {
    newParkingValidation
};

function newParkingValidation(parking) {
    if (!parking.name) {
        return 'Name is required.';
    } else if (!parking.address) {
        return 'Address is required.';
    } else if (!parking.totalSlots) {
        return 'Total slots is required.';
    } else if (isNaN(parking.price)) {
        return 'Price is required.';
    } else {
        return null;
    }
}

module.exports = helpers;

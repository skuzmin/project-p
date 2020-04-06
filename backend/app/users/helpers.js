const helpers = {
    newUserValidation,
    updateUserValidation
};

function newUserValidation(user) {
    if (!user.username) {
        return 'Username is required.';
    } else if (!user.email) {
        return 'Email is required.';
    } else if (!user.password) {
        return 'Password is required.';
    } else {
        return null;
    }
}

function updateUserValidation(user) {
    const props = ['username', 'email'];
    let error = [];
    props.forEach(p => {
        if (!user[p]) {
            error.push(p);
        }
    });
    return error;
}

module.exports = helpers;

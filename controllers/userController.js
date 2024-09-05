const User = require('../models/User.js');

const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = { createUser };

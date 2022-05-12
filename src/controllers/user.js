const { response, request } = require('express');
const { User } = require('../db');

const getAllUsers = async (req = request, res = response) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });

    res.json(users);
};

module.exports = {
    getAllUsers,
};

const { response, request } = require('express');

const getAllCharacters = async (req = request, res = response) => {
    res.json('Get all Characters');
};

const createCharacter = async (req = request, res = response) => {
    res.json('Create Characters');
};

const editCharacter = async (req = request, res = response) => {
    res.json('Edit Characters');
};

const deleteCharacter = async (req = request, res = response) => {
    res.json('Delete Characters');
};

module.exports = {
    getAllCharacters,
    createCharacter,
    editCharacter,
    deleteCharacter,
};

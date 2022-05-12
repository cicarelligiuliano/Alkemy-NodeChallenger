const { response, request } = require('express');

const getAllMovies = async (req = request, res = response) => {
    res.json('Get all Movies');
};

const createMovie = async (req = request, res = response) => {
    res.json('Create Movie');
};

const editMovie = async (req = request, res = response) => {
    res.json('Edit Movie');
};

const deleteMovie = async (req = request, res = response) => {
    res.json('Delete Movie');
};

module.exports = {
    getAllMovies,
    createMovie,
    editMovie,
    deleteMovie,
};

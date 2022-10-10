const { response, request } = require('express');

const { Character, Movie, Genre } = require('../db');

const getAllGenres = async (req = request, res = response) => {
    const genres = await Genre.findAll();

    res.json(genres);
};

const createGenre = async (req = request, res = response) => {
    const { name, image } = req.body;

    try {
        const genre = await Genre.findOne({ where: { name: name.toLowerCase() } });
        if (genre) return res.status(400).json({ ok: false, message: 'Genre already exists' });

        const newGenre = await Genre.create({
            name: name.toLowerCase(),
            image,
        });

        return res.json({ ok: true, message: 'Genre have been created successfully' });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
};

const deleteGenre = async (req = request, res = response) => {
    const { name } = req.body;

    try {
        const genre = await Genre.findOne({ where: { name: name.toLowerCase() } });
        if (!genre) {
            return res.json({ ok: false, message: "Genre doesn't exist" });
        }

        genre.destroy();
        return res.json({ ok: true, message: 'Genre have been deleted' });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllGenres,
    createGenre,
    deleteGenre,
};

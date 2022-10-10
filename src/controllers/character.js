const { response, request } = require('express');

const { Character, Movie } = require('../db');

const getAllCharacters = async (req = request, res = response) => {
    const { name, age, movies, weight } = req.query;
    if (name) {
        req.query.name = name.toLowerCase();
    }
    if (name || age || movies || weight) {
        if (!movies) {
            const characters = await Character.findAll({
                where: {
                    ...req.query,
                },
                include: [
                    {
                        model: Movie,
                    },
                ],
            });
            if (!characters.length) return res.status(400).json({ ok: false, msg: `No characters`, query: req.query });
            return res.json(characters);
        } else {
            const movie = await Movie.findByPk(movies, { include: Character });

            if (!movie) return res.status(400).json({ ok: false, msg: 'Movie not found' });

            const characters = movie.characters;

            if (!characters.length) return res.status(400).json({ ok: false, msg: 'No characters' });

            return res.json(characters);
        }
    } else {
        const characters = await Character.findAll({
            attributes: ['name', 'image', 'age', 'weight', 'history'],
        });
        return res.json(characters);
    }
};

const createCharacter = async (req = request, res = response) => {
    const { name, image, age, weight, history } = req.body;

    const character = await Character.findOne({ where: { name: name.toLowerCase() } });

    if (character) return res.status(400).json({ ok: false, msg: 'Character already exist' });

    const newCharacter = await Character.create({
        name: name.toLowerCase(),
        image,
        age: Number(age),
        weight: Number(weight),
        history,
    });

    res.json({ ok: true, msg: 'Character created' });
};

const editCharacter = async (req = request, res = response) => {
    const { name, ...resto } = req.body;

    const character = await Character.findOne({ where: { name: name.toLowerCase() } });

    if (!character) return res.status(404).json({ ok: false, msg: 'Character not exist' });

    try {
        character.update({ ...resto });

        res.json({ ok: true, msg: 'Character have been updated' });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Problem in back-end' });
    }
};

const deleteCharacter = async (req = request, res = response) => {
    const { name } = req.body;

    const character = await Character.findOne({ where: { name: name.toLowerCase() } });

    if (!character) return res.status(404).json({ ok: false, msg: 'Character not exist' });

    character.destroy();

    res.json({ ok: true, msg: 'Character have been deleted' });
};

module.exports = {
    getAllCharacters,
    createCharacter,
    editCharacter,
    deleteCharacter,
};

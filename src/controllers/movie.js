const { response, request } = require('express');
const { Movie, Character, Genre } = require('../db');

const getAllMovies = async (req = request, res = response) => {
    const { name, genre, order = 'DESC' } = req.query;

    if (name || genre) {
        if (name) {
            const movie = await Movie.findOne({
                where: { title: name.toLowerCase() },
                include: [
                    { model: Character, attributes: ['id', 'name'] },
                    { model: Genre, attributes: ['id', 'name'] },
                ],
            });

            if (!movie) return res.status(400).json({ ok: false, message: 'Movie not found' });

            return res.json(movie);
        } else if (genre) {
            const gen = await Genre.findByPk(genre, {
                include: [{ model: Movie, include: { model: Character, attributes: ['id', 'name'] } }],
                order: [[Movie, 'title', order]],
            });

            if (!gen) return res.status(404).json({ ok: false, message: 'Genre not found' });

            return res.json(gen.movies);
        }
    } else {
        const movies = await Movie.findAll({
            attributes: ['title', 'date', 'image'],
            order: [['title', order]],
        });

        res.json(movies);
    }
};

const createMovie = async (req = request, res = response) => {
    const { title, date, image, calification, characters, genres } = req.body;

    const movie = await Movie.findOne({ where: { title: title.toLowerCase() } });

    if (movie) return res.status(400).json({ ok: false, msg: 'Movie already exist' });

    try {
        const newMovie = await Movie.create({
            title: title.toLowerCase(),
            date: new Date(date),
            image,
            calification: Number(calification),
        });

        if (characters.length > 0) {
            characters.forEach(async (char) => {
                const character = await Character.findOne({ where: { name: char.toLowerCase() } });
                if (character) await newMovie.addCharacter(character);
            });
        }

        if (genres.length > 0) {
            genres.forEach(async (gen) => {
                const genre = await Genre.findOne({ where: { name: gen.toLowerCase() } });
                if (genre) await newMovie.addGenre(genre);
            });
        }

        return res.json({ ok: true, msg: 'Movie created successfully' });
    } catch (error) {
        return res.status(400).json({ ok: false, msg: 'Error' });
    }
};

const editMovie = async (req = request, res = response) => {
    const { title, characters, genres, ...resto } = req.body;

    const movie = await Movie.findOne({
        where: { title: title.toLowerCase() },
        include: [{ model: Genre }, { model: Character }],
    });

    if (!movie) return res.status(400).json({ ok: false, msg: "Movie doesn't exist" });

    try {
        movie.update({ ...resto });

        if (characters.length > 0) {
            const movieCharacters = movie.characters.map((character) => character.dataValues.name);
            const newCharacters = characters.filter((char) => !movieCharacters.includes(char));

            newCharacters.forEach(async (char) => {
                const character = await Character.findOne({ where: { name: char.toLowerCase() } });
                if (character) await movie.addCharacter(character);
            });
        }

        console.log(movie.dataValues);

        if (genres.length > 0) {
            const movieGenres = movie.genres.map((character) => character.dataValues.name);
            const newGenres = genres.filter((gen) => !movieGenres.includes(gen));

            newGenres.forEach(async (gen) => {
                const genre = await Genre.findOne({ where: { name: gen.toLowerCase() } });
                if (genre) await movie.addGenre(genre);
            });
        }

        return res.json({ ok: true, msg: 'Movie have been updated' });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: 'Problem in back-end' });
    }
};

const deleteMovie = async (req = request, res = response) => {
    const { title } = req.body;

    const movie = await Movie.findOne({
        where: {
            title: title.toLowerCase(),
        },
    });

    if (!movie) return res.status(404).json({ ok: false, msg: 'Movie not found' });

    movie.destroy();

    res.json({ ok: true, msg: 'Movie have been deleted' });
};

module.exports = {
    getAllMovies,
    createMovie,
    editMovie,
    deleteMovie,
};

const express = require('express');
const { getAllMovies, createMovie, editMovie, deleteMovie } = require('../controllers/movie');
const router = express.Router();

router.get('/', getAllMovies);
router.post('/', createMovie);
router.put('/', editMovie);
router.delete('/', deleteMovie);

module.exports = router;

const express = require('express');
const { query, body } = require('express-validator');
const { getAllMovies, createMovie, editMovie, deleteMovie } = require('../controllers/movie');
const { validarCampos } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();

router.get(
    '/',
    [
        validarJWT,
        query('name', 'Name must be a string').if(query('name').exists()).isString(),
        query('genre', 'Genre must be an UUID').if(query('genre').exists()).isUUID(),
        query('order', 'Order must be ASC or DESC').if(query('order').exists()).isIn(['ASC', 'DESC']),
        validarCampos,
    ],
    getAllMovies
);
router.post(
    '/',
    [
        validarJWT,
        body('title', 'Title is necessary').notEmpty(),
        body('image', 'Image is necessary').notEmpty(),
        body('date', 'Date is necessary').notEmpty(),
        body('calification', 'Calification is necessary').notEmpty(),
        body('characters', 'Characters are necessary').notEmpty(),
        body('genres', 'Genres are necessary').notEmpty(),
        body('title', 'Title must be a string').isString(),
        body('image', 'Image must be a URL').isURL(),
        body('date', 'Age must be a Date (YYYY-MM-DD)').isDate(),
        body('calification', 'Calification must be a Float').isFloat(),
        body('characters', 'Characters must be an Array').isArray(),
        body('genres', 'Genres must be an Array').isArray(),
        validarCampos,
    ],
    createMovie
);
router.put(
    '/',
    [
        validarJWT,
        body('title', 'Title is necessary').notEmpty(),
        body('title', 'Title must be a string').isString(),
        body('image', 'Image must be a URL').if(body('image').exists()).isURL(),
        body('date', 'Age must be a Date (YYYY-MM-DD)').if(body('date').exists()).isDate(),
        body('calification', 'Calification must be a Float').if(body('calification').exists()).isFloat(),
        body('characters', 'Characters must be an Array').if(body('characters').exists()).isArray(),
        body('genres', 'Genres must be an Array').if(body('genres').exists()).isArray(),
        validarCampos,
    ],
    editMovie
);
router.delete(
    '/',
    [
        validarJWT,
        body('title', 'Title is necessary').notEmpty(),
        body('title', 'Title must be a string').isString(),
        validarCampos,
    ],
    deleteMovie
);

module.exports = router;

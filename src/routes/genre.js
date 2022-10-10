const express = require('express');
const { body } = require('express-validator');
const { getAllGenres, createGenre, deleteGenre } = require('../controllers/genre');
const { validarCampos } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();

router.get('/', [validarJWT], getAllGenres);
router.post(
    '/',
    [
        validarJWT,
        body('name', 'Name is necessary').notEmpty(),
        body('image', 'Image is necessary').notEmpty(),
        body('name', 'Name must be a string').isString(),
        body('image', 'Image must be a URL').isURL(),
        validarCampos,
    ],
    createGenre
);
router.delete(
    '/',
    [
        validarJWT,
        body('name', 'Name is necessary').notEmpty(),
        body('name', 'Name must be a string').isString(),
        validarCampos,
    ],
    deleteGenre
);

module.exports = router;

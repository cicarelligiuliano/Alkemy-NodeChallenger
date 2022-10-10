const express = require('express');
const { check, query, body } = require('express-validator');
const { getAllCharacters, createCharacter, editCharacter, deleteCharacter } = require('../controllers/character');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();

router.get(
    '/',
    [
        validarJWT,
        query('weight', 'Weight must be a integer').if(query('weight').exists()).isInt(),
        query('age', 'Age must be an integer').if(query('age').exists()).isInt(),
        query('movies', 'Movies must be a UUID').if(query('movies').exists()).isUUID(),
        validarCampos,
    ],
    getAllCharacters
);
router.post(
    '/',
    [
        validarJWT,
        body('name', 'Name is necessary').notEmpty(),
        body('image', 'Image is necessary').notEmpty(),
        body('age', 'Age is necessary').notEmpty(),
        body('weight', 'Weight is necessary').notEmpty(),
        body('history', 'history is necessary').notEmpty(),
        body('name', 'Name must be a string').isString(),
        body('image', 'Image must be a URL').isURL(),
        body('age', 'Age must be an Integer').isInt(),
        body('weight', 'Weight must be an Integer').isInt(),
        body('history', 'history must be a string').isString(),
        validarCampos,
    ],
    createCharacter
);
router.put(
    '/',
    [
        validarJWT,
        body('name', 'Name is necessary').notEmpty(),
        body('name', 'Name must be a string').isString(),
        body('image', 'Image must be a URL').if(body('image').exists()).isURL(),
        body('age', 'Age must be an Integer').if(body('age').exists()).isInt(),
        body('weight', 'Weight must be an Integer').if(body('weight').exists()).isInt(),
        body('history', 'history must be a string').if(body('history').exists()).isString(),
        validarCampos,
    ],
    editCharacter
);
router.delete(
    '/',
    [
        validarJWT,
        body('name', 'Name is necessary').notEmpty(),
        body('name', 'Name must be a string').isString(),
        validarCampos,
    ],
    deleteCharacter
);

module.exports = router;

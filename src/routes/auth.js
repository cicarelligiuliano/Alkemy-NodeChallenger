const express = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = express.Router();

router.post(
    '/login',
    [
        check('email', 'The email is necessary').not().isEmpty(),
        check('email', 'The email must be an email').isEmail(),
        check('password', 'The password is necessary').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({
            min: 6,
        }),
        validarCampos,
    ],
    login
);
router.post(
    '/register',
    [
        check('email', 'The email is necessary').not().isEmpty(),
        check('email', 'The email must be an email').isEmail(),
        check('password', 'The password is necessary').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({
            min: 6,
        }),
        validarCampos,
    ],
    register
);

module.exports = router;

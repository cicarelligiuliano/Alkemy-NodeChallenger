var express = require('express');
var router = express.Router();

const charactersRouter = require('./characters');
const authRouter = require('./auth');
const moviesRouter = require('./movie');
const usersRouter = require('./user');

router.use('/characters', charactersRouter);
router.use('/auth', authRouter);
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);

module.exports = router;

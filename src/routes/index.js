var express = require('express');
var router = express.Router();

const charactersRouter = require('./characters');

router.use('/characters', charactersRouter);

module.exports = router;

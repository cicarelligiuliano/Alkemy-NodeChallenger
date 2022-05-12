const express = require('express');
const { getAllCharacters, createCharacter, editCharacter, deleteCharacter } = require('../controllers/character');
const router = express.Router();

router.get('/', getAllCharacters);
router.post('/', createCharacter);
router.put('/', editCharacter);
router.delete('/', deleteCharacter);

module.exports = router;

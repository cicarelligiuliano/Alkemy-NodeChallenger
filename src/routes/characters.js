const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('Get Characters');
});

module.exports = router;

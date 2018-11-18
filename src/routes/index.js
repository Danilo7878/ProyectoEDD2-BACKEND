const express = require('express');
const router = express.Router();

const model = require('../models/users')();

router.get('/', (req, res) => {
    res.send('hola mundo');
});

module.exports = router;
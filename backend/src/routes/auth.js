const express = require('express');
const { signup, signin } = require('../controllers/auth');
const router = express.Router()

router.post('/users/register', signup);
router.post('/users/signin', signin);

module.exports = router
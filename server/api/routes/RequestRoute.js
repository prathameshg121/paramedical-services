const express = require('express');
const router = express.Router();

const multer = require('multer');

const requestCon = require('../controllers/RequestController');

router.post('/userRequest', requestCon.insert_Request);

module.exports = router ;
const express = require('express');
const router = express.Router();

const multer = require('multer');



const UserController = require('../controllers/AppliCon');


router.post('/signup', UserController.signUp);

module.exports = router ;
const express = require('express');
const router = express.Router();

const multer = require('multer');

const UserController = require('../controllers/UserContro');

router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);
router.get('/:userId',  UserController.getOneUser);
module.exports = router ;
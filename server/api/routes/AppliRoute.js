const express = require('express');
const router = express.Router();

const multer = require('multer');



const AppliController = require('../controllers/AppliCon');

router.get('/',AppliController.getAllAppli);
router.post('/signup', AppliController.signUp);
router.post('/login', AppliController.logIn);
router.get('/profession/:profe',AppliController.getByProfession);
router.get('/:userId',  AppliController.getOneUser);
module.exports = router ;
const express = require('express');
const router = express.Router();

const multer = require('multer');
const services = require('../models/services');

const ServiceContro = require('../controllers/covidController')

router.get('/covidVacc', ServiceContro.getBlood_data);

module.exports = router ;
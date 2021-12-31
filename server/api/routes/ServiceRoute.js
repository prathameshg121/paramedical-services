const express = require('express');
const router = express.Router();

const multer = require('multer');
const services = require('../models/services');

const ServiceContro = require('../controllers/ServiceCon')

router.get('/bloodservice', ServiceContro.getBlood_data);

module.exports = router ;
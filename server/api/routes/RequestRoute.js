const express = require('express');
const router = express.Router();

const multer = require('multer');

const requestCon = require('../controllers/RequestController');

router.post('/userRequest', requestCon.insert_Request);
router.get('/getAllRequest',requestCon.getAll_Request);
router.post('/getrequestbydate', requestCon.get_Request_byDate)
router.post('/getrequestbysatate', requestCon.get_Requestby_state)

module.exports = router ;
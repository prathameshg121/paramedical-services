
require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const stripe = require("stripe")(process.env.STRIPE_KEY);

const Blood_service = require('../models/services');

 exports.getBlood_data = (req, res, next) => {
	Blood_service.find({},(error, data)=>{
            if(error){
                console.log("data of blood band not found")
            }
            else{
                // console.log(data);
                res.status(200).json(data);
              
            }
    })
 
    
};
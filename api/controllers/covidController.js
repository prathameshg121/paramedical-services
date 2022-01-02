
require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const stripe = require("stripe")(process.env.STRIPE_KEY);

const Covid_service = require('../models/vaccinCenter');

 exports.getBlood_data = (req, res, next) => {
	Covid_service.find({},(error, data)=>{
            if(error){
                console.log("data of Vaccin band not found")
            }
            else{
                // console.log(data);
                res.status(200).json(data);
              
            }
    })
 
    
};
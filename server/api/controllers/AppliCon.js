require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const stripe = require("stripe")(process.env.STRIPE_KEY);

const User = require('../models/AppliSchema');

exports.signUp = (req, res, next) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                var salt = bcrypt.genSaltSync(10)
                return bcrypt.hash(req.body.password, salt, null, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            gender :req.body.gender,
                            profession : req.body.profession,
                            FName: req.body.FName,
                            LName: req.body.LName,
                            UserName: req.body.UserName,
                            City: req.body.City,
                            zip: req.body.zip,
                            
                            
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
            const error = new Error();
            error.message = 'Appli Exists!';
            throw error;
        })
        .catch((error) => {
            console.log(error)
        });
};

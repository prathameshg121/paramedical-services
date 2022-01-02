require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const stripe = require("stripe")(process.env.STRIPE_KEY);


const User = require('../models/UserSchema');


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
                            FName: req.body.FName,
                            LName: req.body.LName,
                           
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
            error.message = 'User Exists!';
            throw error;
        })
        .catch((error) => {
            console.log(error)
        });
};




exports.logIn = (req, res, next) => {
    let email = undefined, userId = undefined;
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    errror: "No user found!"
                });
            }
            email = user[0].email;
            userId = user[0]._id;
            return bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
    
                    return res.status(200).json({
                        message: 'Auth Successful!',
                      
                        user: user[0],
                    });
                }
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            });
        })
        .catch(error => {
            next(error);
        });
};




exports.getOneUser = (req, res, next) => {
    const userId = req.params.userId;
    User
        .find({_id :userId})
        .then(users => {
			const response = {
				count: users.length,
				users: users.map(user => {
					return {
						_id: user._id,
						email: user.email,
                        password : user.password,
						gender: user.gender,
                        profession : user.profession,
                        FName: user.FName,
                        LName: user.LName,
                        UserName: user.UserName,
                        City: user.City,
                        phoneNo : user.phoneNo,
            
					}
				})
			};
			res.status(200).json(response);
            // console.log(response);
		})
		.catch(error => {
			next(error);
		})
}




require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const stripe = require("stripe")(process.env.STRIPE_KEY);

const Appli = require('../models/AppliSchema');

exports.signUp = (req, res, next) => {
    Appli
        .find({ email: req.body.email })
        .exec()
        .then(appli => {
            if (appli.length < 1) {
                var salt = bcrypt.genSaltSync(10)
                return bcrypt.hash(req.body.password, salt, null, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const appli = new Appli({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            gender :req.body.gender,
                            profession : req.body.profession,
                            FName: req.body.FName,
                            LName: req.body.LName,
                            UserName: req.body.UserName,
                            City: req.body.City,
                            phoneNo: req.body.phoneNo,
                            
                            
                        });
                        appli
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Appli created"
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





exports.logIn = (req, res, next) => {
    let email = undefined, userId = undefined;
    Appli
        .find({ email: req.body.email })
        .exec()
        .then(appli => {
            if (appli.length < 1) {
                return res.status(404).json({
                    errror: "No appli found!"
                });
            }
            email = appli[0].email;
            userId = appli[0]._id;
            return bcrypt.compare(req.body.password, appli[0].password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
    
                    return res.status(200).json({
                        message: 'Auth Successful!',
                      
                        appli: appli[0],
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
    Appli
        .find({_id :userId})
        .then(applis => {
			const response = {
				count: applis.length,
				applis: applis.map(appli => {
					return {
						_id: appli._id,
						email: appli.email,
                        password : appli.password,
						gender: appli.gender,
                        profession : appli.profession,
                        FName: appli.FName,
                        LName: appli.LName,
                        UserName: appli.UserName,
                        City: appli.City,
                        phoneNo : appli.phoneNo,
            
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



//  exports.getApplic = (req, res,next)=>{
//         User.find({},function(err, allAppli){
//             if(err) console.warn(err);
//             console.warn(allAppli);
//         })
//  }
 exports.getAllAppli = (req, res, next) => {
	Appli.find({})
    .then(applis => {
			const response = {
				count: applis.length,
				applis: applis.map(appli => {
					return {
						_id: appli._id,
						email: appli.email,
                        password : appli.password,
						gender: appli.gender,
                        profession : appli.profession,
            FName: appli.FName,
            LName: appli.LName,
            UserName: appli.UserName,
            City: appli.City,
            phoneNo : appli.phoneNo,
            
					}
				})
			};
			res.status(200).json(response);
            // console.log(response);
		})
		.catch(error => {
			next(error);
		})
};


exports.getByProfession = (req, res, next) => {
    console.log(req.params.profe)
    Appli.find({profession :req.params.profe })
    .then(applis => {
			const response = {
				count: applis.length,
				applis: applis.map(appli => {
					return {
						_id: appli._id,
						email: appli.email,
                        password : appli.password,
						gender: appli.gender,
                        profession : appli.profession,
                        FName: appli.FName,
                        LName: appli.LName,
                        UserName: appli.UserName,
                        City: appli.City,
                        phoneNo : appli.phoneNo,
            
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



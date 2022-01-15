require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const Request_service = require("../models/RequestServiceModule");

exports.insert_Request = (req, res, next) => {
  Request_service.find({ email: req.body.email })
    .exec()
    .then((request) => {
      if (request.length < 1) {
        return new Request_service({
          _id: new mongoose.Types.ObjectId(),

          FName: req.body.FName,
          LName: req.body.LName,
          email: req.body.email,
          serviceName: req.body.serviceName,
          District: req.body.District,
          Date: req.body.Date,
          Month: req.body.Month,
          Year: req.body.Year,
          Latitude: req.body.Latitude,
          Longitude: req.body.Longitude,
        })
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "requeRequest_servicest created",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
      const error = new Error();
      error.message = "requeRequest_servicest Exists!";
      throw error;
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAll_Request = (req, res, next) => {
  Request_service.find({}, (error, data) => {
    if (error) {
      console.log("data of blood band not found");
    } else {
      // console.log(data);
      res.status(200).json(data);
    }
  });
};

exports.get_Request_byDate = (req, res, next) => {
    console.log("this is date")
    console.log(req.body.date);
    Request_service.find({Date : {$gt : req.body.date, $lte : new Date()}}, (error, data) => {
      if (error) {
        console.log("data of blood band not found");
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    });
  };

  exports.get_Requestby_state = (req, res, next) => {
    console.log("this is date")
    console.log(req.body.district);
    Request_service.find({District :  req.body.district}, (error, data) => {
      if (error) {
        console.log("data of req state");
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    });
  };



  
// exports.getByProfession = (req, res, next) => {
//   console.log(req.params.profe)
//   Appli.find({profession :req.params.profe })
//   .then(applis => {
//     const response = {
//       count: applis.length,
//       applis: applis.map(appli => {
//         return {
//           _id: appli._id,
//           email: appli.email,
//                       password : appli.password,
//           gender: appli.gender,
//                       profession : appli.profession,
//                       FName: appli.FName,
//                       LName: appli.LName,
//                       UserName: appli.UserName,
//                       City: appli.City,
//                       phoneNo : appli.phoneNo,
          
//         }
//       })
//     };
//     res.status(200).json(response);
//           // console.log(response);
//   })
//   .catch(error => {
//     next(error);
//   })
    
// }

let textval ;
exports.sendMail = (req, res, next) => {
  console.log(req.body.email);
  textval = " Name : " + req.body.name + " Email :" + req.body.email + " phone Number :" + req.body.phoneNo + " FeedBack : " + req.body.feedback;
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'servicesparamedical2@gmail.com',
        pass: 'Project@123'
    }
  });

  var mailOptions = {
    from: 'servicesparamedical2@gmail.com',
    to: 'servicesparamedical2@gmail.com',
    subject:'FeedBack',
    text: " Name : " + req.body.name + " Email :" + req.body.email + " phone Number :" + req.body.phoneNo + " FeedBack : " + req.body.feedback
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({
          result: "Email Send Successfully",
      });
    }
  });
};

